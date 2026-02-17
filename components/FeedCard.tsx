import TripleDots from '@/assets/svgs/TripleDots';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useRef, useState } from 'react';
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
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    
    const iconRef = useRef<View>(null);

    const handleOpenMenu = () => {
        iconRef.current?.measure((fx, fy, width, height, px, py) => {
            const screenWidth = Dimensions.get('window').width;
            setMenuPosition({
                top: py + height, 
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
                // Reduced min-h to 160 to prevent excess whitespace
                // Changed from margin-based internal spacing to p-4 (padding) to maximize width for text
                className='border-[2px] rounded-[15px] w-full min-h-[210] justify-end items-start relative p-4'
                onPress={onPress}>

                {/* Icon Position Updated to match new padding (p-4) */}
                <Text className='absolute top-6 left-6 text-5xl'>{icon}</Text>

                {/* Triple Dots Menu - Absolute Top Right */}
                <View
                    ref={iconRef}
                    collapsable={false} 
                    className='absolute top-0 right-0 z-10'
                >
                    <Pressable 
                        onPress={handleOpenMenu}
                        className="p-4"
                    >
                        <TripleDots color={colors.fontColor} />
                    </Pressable>
                </View>

                {/* Title 
                    - Removed m-6 to use parent padding instead (gives more width)
                    - Added flex-shrink to ensure it respects container bounds
                */}
                <Text 
                    className='font-manropeBold text-xl' 
                    style={{ color: colors.fontColor }}
                >
                    {title}
                </Text>

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