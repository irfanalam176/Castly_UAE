import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import { correctSize } from '../../utils';
import Banner from '../../components/profile/Banner';
import UserInfo from '../../components/profile/UserInfo';
import ProfileTabs, { Tab } from '../../components/profile/ProfileTabs';
import { colors } from '../../utils/colors';
import PortfolioTab from '../../components/profile/portfolio/PortfolioTab';
import MyStatsTab from '../../components/profile/myStats/MyStatsTab';
import SettingsTab from '../../components/profile/settings/SettingsTab';
import { SlideLeftFade } from '../../components/Animation';
import { useProfile } from '../../hooks/useProfile';
import { ActionSheetRef } from 'react-native-actions-sheet';
import EditActionSheet from '../../components/profile/EditProfile/EditActionSheet';
import { useDispatch } from 'react-redux';
import { setRefresh } from '../../redux/reducers/profileRefreshSlice';

const STAGGER = 150;

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Portfolio');
  const [refreshing, setRefreshing] = useState(false);
  const { profile, fetchProfile } = useProfile();
  const dispatch = useDispatch();
  const renderTab = () => {
    switch (activeTab) {
      case 'Portfolio':
        return <PortfolioTab />;
      case 'My Stats':
        return <MyStatsTab />;
      case 'Settings':
        return <SettingsTab />;
    }
  };

  const sheetRef = useRef<ActionSheetRef>(null);

  function handleEdit() {
    sheetRef.current?.show();
  }

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
       fetchProfile();
    } finally {
      setRefreshing(false);
    }
  }, []);
  return (
    <ScreenWrapper>
      <EditActionSheet actionSheetRef={sheetRef} />
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            progressBackgroundColor={colors.darkgray_1}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        <Banner onEdit={handleEdit} image={profile?.coverUrl} />

        <View style={styles.body}>
          {/* 2 — User Info */}
          <SlideLeftFade delay={STAGGER * 2}>
            <UserInfo
              onProfilePress={handleEdit}
              profileImage={profile?.avatarUrl}
              name={profile?.name}
              username={`@${profile?.instagramHandle || ''}`}
              role={profile?.category}
              rating={profile?.rating}
              reviews={profile?.reviewCount}
              location={profile?.location}
              followers={profile?.instagramFollowers || 0}
              badges={profile?.specialties}
              jobsDone={profile?.totalJobsDone}
              avgRating={profile?.rating}
              totalEarned={`AED ${profile?.wallet.totalEarned}`}
            />
          </SlideLeftFade>

          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 4 — Tab Content */}
          <View style={styles.tabContent}>{renderTab()}</View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.lightBlue_5,
    paddingBottom: correctSize(10),
  },
  body: {
    paddingHorizontal: correctSize(24),
  },
  tabContent: {
    marginTop: correctSize(16),
  },
});
