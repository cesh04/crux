import FeedCard from '@/components/FeedCard';
import HomeBurger from '@/components/homeburger';
import Header from '@/components/HomeHeader';
import SearchBar from '@/components/SearchBar';
import { db } from '@/firebaseConfig';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useRouter } from 'expo-router';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
// Make sure this path is correct based on your project structure
import { useAuth } from '../../context/AuthContext';
// This import is correct, assuming utils/ is in your root
import { getTopicPrompt } from '../../utils/Prompt';

type CardItem = {
  id: string;
  title: string;
  icon?: string;
};

const HomePage = () => {
  const colors = useThemeColors();
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState('undefined');
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [cardData, setCardData] = useState<CardItem[]>([]);

  // Effect to get the user's name
  useEffect(() => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setName(docSnap.data().displayName);
      } else {
        console.log('user document not found');
      }
    });
    return () => unsubscribe();
  }, [user]);

  // Effect to get the list of topics
  useEffect(() => {
    if (!user) return;

    const topicsRef = collection(db, 'users', user.uid, 'topics');
    const q = query(topicsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const topicsList = snapshot.docs.map((doc) => ({
        id: doc.id, // This is the topicId, e.g., "cars"
        title: doc.data().title,
        icon: doc.data().icon,
      })) as CardItem[];
      setCardData(topicsList);
    });

    return () => unsubscribe();
  }, [user]);

  // --- Gemini & Firestore Functions ---
  const callGeminiAPI = async (topic: string) => {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        'Gemini API Key is missing. Check your .env file and restart the server.'
      );
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const fullPrompt = getTopicPrompt(topic);

    const payload = {
      contents: [{ parts: [{ text: fullPrompt }] }],
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorBody = await response.text();
        console.error('API Response Error Body:', errorBody);
        throw new Error(
          `API Error: ${response.status} ${response.statusText}. Body: ${errorBody}`
        );
      }
      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('No content returned from API.');
      return text;
    } catch (error) {
      console.error('Gemini API call failed (full error):', error);
      throw error;
    }
  };

  const saveTopicToFirestore = async (uid: string, aiJsonString: string) => {
    let cleanJsonString = '';
    try {
      const jsonMatch = aiJsonString.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        console.error('No JSON object found in Gemini response:', aiJsonString);
        throw new Error(
          'Gemini response did not contain a valid JSON object.'
        );
      }

      cleanJsonString = jsonMatch[0];
      cleanJsonString = cleanJsonString.replace(/\\'/g, "'");

      console.log('--- GEMINI RAW (CLEANED) RESPONSE ---');
      console.log(cleanJsonString);
      console.log('------------------------------------');

      const aiData = JSON.parse(cleanJsonString);

      if (!aiData || !aiData.topic) {
        throw new Error(
          "Parsed JSON is invalid or missing the 'topic' property."
        );
      }

      const topicId = aiData.topic.toLowerCase().replace(/\s+/g, '_');
      const topicRef = doc(db, 'users', uid, 'topics', topicId);

      const batch = writeBatch(db);

      batch.set(topicRef, {
        title: aiData.topic,
        icon: aiData.icon || '📚',
        createdAt: serverTimestamp(),
      });

      for (const chunk of aiData.chunks) {
        const chunkId = `chunk_${chunk.id}`;
        const contentRef = doc(topicRef, 'content', chunkId);

        batch.set(contentRef, {
          title: chunk.title,
          text: chunk.content,
          order: chunk.id,
        });
      }

      await batch.commit();
      return aiData.topic;
    } catch (error) {
      console.error('Firestore write failed:', error);
      if (error instanceof SyntaxError) {
        console.error('Failed to parse JSON. The string was:', cleanJsonString);
      }
      throw error;
    }
  };

  const handleSearchSubmit = async () => {
    if (!searchQuery.trim() || !user) return;
    setIsLoading(true);
    try {
      const geminiResult = await callGeminiAPI(searchQuery);
      const newTopicTitle = await saveTopicToFirestore(
        user.uid,
        geminiResult
      );
      Alert.alert(
        'Success',
        `Topic "${newTopicTitle}" has been saved.`
      );
      setSearchQuery('');
    } catch (error: any) {
      console.error('handleSearchSubmit error:', error);
      Alert.alert(
        'Error',
        `Failed to create topic. Here is the full error message: \n\n${String(
          error
        )}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTopic = async (topicId: string, topicTitle: string) => {
    if (!user) return;

    Alert.alert(
      "Delete Topic?",
      `Are you sure you want to delete "${topicTitle}"? This will delete all your notes and cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const topicRef = doc(db, 'users', user.uid, 'topics', topicId);
              const contentRef = collection(topicRef, 'content');
              const contentSnap = await getDocs(contentRef);
              const batch = writeBatch(db);

              contentSnap.docs.forEach((doc) => {
                batch.delete(doc.ref);
              });

              batch.delete(topicRef);

              await batch.commit();
            } catch (error) {
              console.error("Error deleting topic:", error);
              Alert.alert("Error", "Failed to delete topic.");
            }
          },
        },
      ]
    );
  };

  const handleCardPress = (topicId: string) => {
    router.push({
      pathname: '/(app)/scrolling',
      params: { topicId: topicId },
    });
  };

  const CardList = () => (
    <FlatList<CardItem>
      data={cardData}
      keyExtractor={(item) => item.id}
      numColumns={2}
      // Content padding ensures the last item scrolls up enough to be seen above the search bar
      contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 12, paddingBottom: 100 }}
      columnWrapperStyle={{ justifyContent: 'flex-start', marginBottom: 12 }}
      renderItem={({ item }) => (
        <FeedCard
          title={item.title}
          icon={item.icon}
          onPress={() => handleCardPress(item.id)}
          onDeletePress={() => handleDeleteTopic(item.id, item.title)}
        />
      )}
    />
  );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.backColor }}>
      {/* 1. Header and Content in a flex-1 container */}
      <View className="flex-1">
        <Header onMenuPress={() => setMenuVisible(true)} />

        <Text
          className="font-manropeBold text-2xl ml-6 mt-6 text-white"
          style={{ color: colors.fontColor }}
        >
          Hi {name},
        </Text>

        <Text
          className="font-manrope m-2 text-xl ml-6 mt-1 text-white"
          style={{ color: colors.fontColor }}
        >
          Dive into your favourite topic now!
        </Text>

        <CardList />
      </View>

      {/* 2. KeyboardAvoidingView now sits naturally below the content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset is often needed for Expo Router headers
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} 
      >
        <View
          className="px-6 pt-2 pb-4"
          style={{ backgroundColor: colors.backColor }}
        >
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={handleSearchSubmit}
            placeholder={
              isLoading ? 'Generating topic...' : 'Enter your topic here!'
            }
            editable={!isLoading}
          />
          {isLoading && (
            <ActivityIndicator
              size="small"
              color={colors.fontColor}
              style={{ marginTop: 8 }}
            />
          )}
        </View>
      </KeyboardAvoidingView>

      <HomeBurger
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </View>
  );
};

export default HomePage;