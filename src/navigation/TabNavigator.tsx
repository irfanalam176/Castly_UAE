import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withSpring,
    withTiming,
    useSharedValue,
} from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { stackRoutes } from './screenIds';
import Home from '../screens/Tabs/Home';
import Applications from '../screens/Tabs/applications/Applications';
import UserProfile from '../screens/Tabs/UserProfile';
import { colors } from '../utils/colors';
import { correctSize, isIOS } from '../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabParamList } from './navigationTypes';
import CompassIcon from '../assets/svg/tabs/CompassIcon';
import FolderIcon from '../assets/svg/tabs/FolderIcon';
import WalletIcon from '../assets/svg/tabs/WalletIcon';
import ChatIcon from '../assets/svg/tabs/ChatIcon';
import ProfileIcon from '../assets/svg/tabs/ProfileIcon';
import MyJobs from '../screens/Tabs/myJobs/MyJobs';
import Messages from '../screens/Tabs/chat/Messages';
import Payments from '../screens/Tabs/payments/Payments';

const Tab = createBottomTabNavigator<TabParamList>();

// Types
interface AnimatedTabButtonProps {
    children: React.ReactNode;
    onPress: () => void;
    isFocused: boolean;
    label: string;
}

interface IconProps {
    fillColor: string;
}

// Animated Tab Button Component
const AnimatedTabButton: React.FC<AnimatedTabButtonProps> = ({
    children,
    onPress,
    isFocused,
    label
}) => {
    const iconTranslateY = useSharedValue(0);
    const iconOpacity = useSharedValue(1);
    const labelTranslateY = useSharedValue(20);
    const labelOpacity = useSharedValue(0);
    const dotScale = useSharedValue(0);

    React.useEffect(() => {
        if (isFocused) {
            // Icon goes UP and disappears
            iconTranslateY.value = withSpring(-25, {
                damping: 15,
                stiffness: 150,
            });
            iconOpacity.value = withTiming(0, { duration: 250 });

            // Label comes from bottom
            labelTranslateY.value = withSpring(0, {
                damping: 15,
                stiffness: 150,
            });
            labelOpacity.value = withTiming(1, { duration: 250 });

            // Dot appears
            dotScale.value = withSpring(1, {
                damping: 12,
                stiffness: 200,
            });
        } else {
            // Icon comes back
            iconTranslateY.value = withSpring(0, {
                damping: 15,
                stiffness: 150,
            });
            iconOpacity.value = withTiming(1, { duration: 250 });

            // Label goes down and disappears
            labelTranslateY.value = withSpring(20, {
                damping: 15,
                stiffness: 150,
            });
            labelOpacity.value = withTiming(0, { duration: 250 });

            // Dot disappears
            dotScale.value = withSpring(0, {
                damping: 12,
                stiffness: 200,
            });
        }
    }, [isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: iconTranslateY.value }],
        opacity: iconOpacity.value,
    }));

    const animatedLabelStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: labelTranslateY.value }],
        opacity: labelOpacity.value,
    }));

    const animatedDotStyle = useAnimatedStyle(() => ({
        transform: [{ scale: dotScale.value }],
    }));

    return (
        <Pressable
            onPress={onPress}
            style={styles.tabButton}
        >
            <View style={styles.tabContent}>
                {/* Icon that disappears when active */}
                <Animated.View style={[styles.iconWrapper, animatedIconStyle]}>
                    {children}
                </Animated.View>

                {/* Label that appears when active */}
                <Animated.Text
                    style={[
                        styles.tabLabel,
                        { color: colors.darkgray },
                        animatedLabelStyle,
                    ]}
                >
                    {label}
                </Animated.Text>

                {/* Dot that appears below label when active */}
                <Animated.View style={[styles.dot, animatedDotStyle]} />
            </View>
        </Pressable>
    );
};

// Custom Tab Bar Component
const CustomTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.tabBar,
                {
                    height: !isIOS ? correctSize(68) : correctSize(78),
                    paddingBottom: !isIOS
                        ? insets.bottom - correctSize(42)
                        : insets.bottom - correctSize(10),
                    marginBottom: !isIOS ? insets.bottom : 0,
                },
            ]}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                        ? options.title
                        : route.name;
                const Icon = options.tabBarIcon as any;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <AnimatedTabButton
                        key={route.key}
                        onPress={onPress}
                        isFocused={isFocused}
                        label={typeof label === 'string' ? label : route.name}
                    >
                        {Icon && (
                            <Icon
                                fillColor={isFocused ? colors.primary : colors.gray}
                            />
                        )}
                    </AnimatedTabButton>
                );
            })}
        </View>
    );
};

const TabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                name={stackRoutes.Home}
                component={Home}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <CompassIcon/>
                    ),
                }}
            />
            <Tab.Screen
                name={stackRoutes.Wallet}
                component={MyJobs}
                options={{
                    tabBarLabel: 'My Jobs',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <FolderIcon/>
                    ),
                }}
            />
            <Tab.Screen
                name={stackRoutes.Payments}
                component={Payments}
                options={{
                    tabBarLabel: 'Payments',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <WalletIcon/>
                    ),
                }}
            />
            <Tab.Screen
                name={stackRoutes.Messages}
                component={Messages}
                options={{
                    tabBarLabel: 'Messages',
                    tabBarIcon: ({ color }: { color: string }) => (
                       <ChatIcon/>
                    ),
                }}
            />
            <Tab.Screen
                name={stackRoutes.UserProfile}
                component={UserProfile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <ProfileIcon/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContent: {
        alignItems: 'center',
        justifyContent: 'center',
        height: correctSize(50),
        position: 'relative',
    },
    iconWrapper: {
        position: 'absolute',
        top: correctSize(8),
    },
    tabLabel: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        position: 'absolute',
        top: correctSize(12),
        color: colors.black
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.primary,
        position: 'absolute',
        bottom: correctSize(8),
    },
});

export default TabNavigator;