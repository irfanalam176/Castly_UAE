import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import ApplicationHeader from '../../../components/applications/ApplicationHeader';
import Pending from './Pending';
import Shortlisted from './Shortlisted';
import { colors } from '../../../utils/colors';
import { correctSize } from '../../../utils';
import { useSelector } from 'react-redux';
import { stackRoutes } from '../../../navigation/screenIds';
import { useNavigation } from '@react-navigation/native';
import { NavProp } from '../../../navigation/navigationTypes';
import { RootState } from '../../../redux/stores/store';

const { width } = Dimensions.get('window');

const TABS = [
  { key: 'pending', label: 'Pending' },
  { key: 'shortlisted', label: 'Shortlisted' },
  { key: 'confirmed', label: 'Confirmed' },
];

const Applications = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const pendingCount = useSelector(
    (state: RootState) => state.application.pendingCount,
  );
  const shortlistedCount = useSelector(
    (state: RootState) => state.application.shortlistedCount,
  );
  const confirmedCount = useSelector(
    (state: RootState) => state.application.confirmedCount,
  );

  const counts = {
    pending: pendingCount,
    shortlisted: shortlistedCount,
    confirmed: confirmedCount,
  };
  const indicatorPosition = useSharedValue(0);
  const tabWidth = width / TABS.length;

  const handleTabPress = (index: number) => {
    setActiveIndex(index);
    indicatorPosition.value = withTiming(index * tabWidth, { duration: 250 });
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value }],
  }));

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return <Pending />;
      case 1:
        return <Shortlisted />;
      case 2:
        return <Text>Confirmed Applications</Text>;
      default:
        return null;
    }
  };

  const navigation = useNavigation<NavProp>()
  return (
    <ScreenWrapper>
      <ApplicationHeader onRightPress={()=>navigation.navigate(stackRoutes.Filter)}/>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {TABS.map((tab, index) => {
          const isActive = activeIndex === index;
          const count = counts[tab.key as keyof typeof counts];

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => handleTabPress(index)}
              activeOpacity={0.7}
            >
              <View style={styles.tabContent}>
                <Text
                  style={[styles.tabLabel, isActive && styles.tabLabelActive]}
                >
                  {tab.label}
                </Text>
                <View style={[styles.badge, isActive && styles.badgeActive]}>
                  <Text
                    style={[
                      styles.badgeText,
                      isActive && styles.badgeTextActive,
                    ]}
                  >
                    {count}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {/* Animated Indicator */}
        <Animated.View
          style={[styles.indicator, indicatorStyle, { width: tabWidth }]}
        />
      </View>

      {/* Tab Content */}
      <View style={styles.content}>{renderContent()}</View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: correctSize(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
  },
  tabLabel: {
    fontSize: correctSize(13),
    fontWeight: '500',
    color: colors.gray_4,
  },
  tabLabelActive: {
    color: colors.purple,
  },
  badge: {
    backgroundColor: colors.lightBlue_5,
    borderRadius: correctSize(10),
    paddingHorizontal: correctSize(6),
    paddingVertical: correctSize(2),
    minWidth: correctSize(20),
    alignItems: 'center',
  },
  badgeActive: {
    backgroundColor: colors.lightBlue_3,
  },
  badgeText: {
    fontSize: correctSize(11),
    fontWeight: '600',
    color: colors.gray_4,
  },
  badgeTextActive: {
    color: colors.purple,
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: correctSize(2),
    backgroundColor: colors.purple,
  },
  content: {
    flex: 1,
    padding: correctSize(24),
    paddingBottom:0,
    backgroundColor: colors.lightBlue_5,
  },
});

export default Applications;
