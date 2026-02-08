import PressedBookmark from "@/assets/svgs/PressedBookmark";
import PressedTick from "@/assets/svgs/PressedTick";
import TripleDots from "@/assets/svgs/TripleDots";
import UnpressedBookmark from "@/assets/svgs/UnpressedBookmark";
import UnpressedTick from "@/assets/svgs/UnpressedTick";
import { useThemeColors } from "@/hooks/useThemeColors";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

type ChunkProps = {
  id: string;
  text: string;
  order: number;
  title: string;
  height?: number;
};

export default function Card({
  id,
  text,
  order,
  title, // This 'title' is now the chunk's title
  height = 800,
}: ChunkProps) {
  const colors = useThemeColors();

  // --- Restored Local State ---
  const [activeStates, setActiveStates] = useState({
    read: false,
    noted: false,
    bookmarked: false,
  });

  const toggleButton = (key: keyof typeof activeStates) => {
    setActiveStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  // --- End of Restored Local State ---

  return (
    <View
      style={{ height, backgroundColor: colors.backColor }}
      className="w-full p-12 items-start"
    >
      <Text
        className="text-[26px] font-manropeBold mb-5 text-left"
        style={{ color: colors.scrollingFont }}
      >
        {title}
      </Text>
      <Text
        className="text-[20px] font-manrope leading-[26px] text-left"
        style={{ color: colors.scrollingFont }}
      >
        {text}
      </Text>

      {/* --- Restored Buttons --- */}
      <View className="absolute right-5 bottom-10 flex-col items-center space-y-6">
        <Pressable className="mb-8" onPress={() => toggleButton("read")}>
          {activeStates.read ? <PressedTick /> : <UnpressedTick color={colors.logo} />}
        </Pressable>

        {/* <Pressable
          className="mb-8"
          onPress={() => toggleButton("noted")}
        >
          {activeStates.noted ? <PressedNotes /> : <UnpressedNotes />}
        </Pressable> */}

        <Pressable
          className="mb-8"
          onPress={() => toggleButton("bookmarked")}
        >
          {activeStates.bookmarked ? (
            <PressedBookmark />
          ) : (
            <UnpressedBookmark color={colors.logo}/>
          )}
        </Pressable>

        <Pressable className="mb-8">
          <TripleDots />
        </Pressable>
      </View>
      {/* --- End of Restored Buttons --- */}

      <View className="absolute bottom-10 w-full p-6">
        <Text
          className="text-xl font-manrope"
          style={{ color: colors.scrollingFont }}
        >
          Links
        </Text>
      </View>
    </View>
  );
}