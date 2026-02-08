import TripleDots from '@/assets/svgs/TripleDots';
import { useThemeColors } from '@/hooks/useThemeColors';
import React, { useRef, useState } from 'react';
import { Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    title: string;
    icon?: string;
    onPress?: () => void;
    onDeletePress?: () => void;
}

const FeedCard = ({ title, icon, onPress, onDeletePress }: Props) => {
    const colors = useThemeColors();
    const [menuVisible, setMenuVisible] = useState(false);
    // Store top and right positions
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    
    const iconRef = useRef<View>(null);

    const handleOpenMenu = () => {
        iconRef.current?.measure((fx, fy, width, height, px, py) => {
            const screenWidth = Dimensions.get('window').width;
            setMenuPosition({
                top: py + height, 
                // Calculate distance from the right edge of the screen
                right: screenWidth - px - width
            });
            setMenuVisible(true);
        });
    };

    const handleDelete = () => {
        setMenuVisible(false);
        if (onDeletePress) {
            onDeletePress();
        }
    };

    return (
        <View className='w-[43%] mx-4 mt-6'>
            <Pressable
                style={{ borderColor: colors.cardBorder }}
                className='border-[2px] rounded-[15px] w-full h-[223] justify-end items-start'
                onPress={onPress}>

                {/* Icon wrapper with ref */}
                {/* Changed positioning to 0 to compensate for the larger padding inside */}
                <View
                    ref={iconRef}
                    collapsable={false} 
                    className='absolute top-0 right-0 z-10'
                >
                    {/* Added p-4 here to make the hitbox significantly larger */}
                    <Pressable 
                        onPress={handleOpenMenu}
                        className="p-4"
                    >
                        <TripleDots color={colors.fontColor} />
                    </Pressable>
                </View>

                <Text className='text-5xl m-6'>{icon}</Text>
                <Text className='font-manropeBold text-xl m-6' style={{ color: colors.fontColor }}>{title}</Text>

            </Pressable>

            <Modal
                visible={menuVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <Pressable
                    className="flex-1"
                    onPress={() => setMenuVisible(false)}
                >
                    <View
                        className="absolute w-40 rounded-lg shadow-lg"
                        style={{
                            backgroundColor: colors.cardBorder,
                            top: menuPosition.top,
                            // Anchor to the right side using the calculated value
                            right: menuPosition.right 
                        }}
                    >
                        <TouchableOpacity
                            onPress={handleDelete}
                            className="p-4"
                        >
                            <Text className="text-lg font-manrope" style={{ color: '#FF453A' }}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>

        </View>
    )
}

export default FeedCard;