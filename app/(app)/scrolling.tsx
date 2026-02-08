import Card from "@/components/ContentCard";
import ScrollHeader from "@/components/ScrollHeader";
import { db } from "@/firebaseConfig";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams } from "expo-router";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

type Chunk = {
  id: string;
  order: number;
  text: string;
  title: string; // 1. ADDED TITLE HERE
};

type Content = {
  text: string;
  order: number;
  title: string; // 2. ADDED TITLE HERE
};

const { height: screenHeight } = Dimensions.get("screen");

export default function ScrollingPage() {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();

  const { topicId } = useLocalSearchParams<{ topicId: string }>();
  const { user } = useAuth();

  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [topicTitle, setTopicTitle] = useState("Topic");
  const [isLoading, setIsLoading] = useState(true);

  const headerHeight = Platform.select({ ios: 44, android: 56, default: 56 });
  const availableHeight = screenHeight - insets.top - (headerHeight ?? 56);

  useEffect(() => {
    if (!user || !topicId) return;

    const topicRef = doc(db, 'users', user.uid, 'topics', topicId);
    const contentRef = collection(topicRef, 'content');
    const contentQuery = query(contentRef, orderBy('order', 'asc'));

    const unsubTopic = onSnapshot(topicRef, (docSnap) => {
      if (docSnap.exists()) {
        setTopicTitle(docSnap.data().title || "Topic");
      }
    });

    const unsubContent = onSnapshot(
      contentQuery,
      (contentSnap) => {
        const contentData: Chunk[] = [];
        contentSnap.docs.forEach((contentDoc) => {
          const content = contentDoc.data() as Content;
          contentData.push({
            id: contentDoc.id,
            ...content,
          });
        });

        setChunks(contentData);
        setIsLoading(false);
      }
    );

    return () => {
      unsubTopic();
      unsubContent();
    };
  }, [user, topicId]);

  const getItemLayout = (_: any, index: number) => ({
    length: availableHeight,
    offset: availableHeight * index,
    index,
  });

  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.backColor }}
      >
        <ActivityIndicator size="large" color={colors.fontColor} />
      </View>
    );
  }

  const renderCard = ({ item }: { item: Chunk }) => (
    <Card
      id={item.id}
      text={item.text}
      order={item.order}
      height={availableHeight}
      title={item.title} // 3. THIS IS THE FIX: Pass the chunk's title
    />
  );

  return (
    <View className="flex-1" style={{backgroundColor: colors.backColor}}>
      <ScrollHeader title={topicTitle} />
      <FlatList
        data={chunks}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        bounces={false}
        getItemLayout={getItemLayout}
        className="flex-1"
      />
    </View>
  );
}

export const options = {
  headerShown: false,
};