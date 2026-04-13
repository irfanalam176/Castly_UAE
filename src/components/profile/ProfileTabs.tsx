import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';

export type Tab = 'Portfolio' | 'My Stats' | 'Settings';

const TABS: Tab[] = ['Portfolio', 'My Stats', 'Settings'];

interface ProfileTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const ProfileTabs = ({ activeTab, onTabChange }: ProfileTabsProps) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <Pressable
            key={tab}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onTabChange(tab)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default ProfileTabs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding:correctSize(4)
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  tabActive: {
    borderRadius: 14,
    backgroundColor: colors.darkgray_1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  activeTabText: {
    color: colors.white,
  },
  tabText: {
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray,
    fontSize: 12,
  },
});