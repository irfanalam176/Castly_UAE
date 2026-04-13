import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Share,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils/colors';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import HomeHeader from '../../components/home/HomeHeader';
import JobCard from '../../components/home/JobCard';
import { ROUTES } from '../../services/routes';
import CustomButton from '../../components/common/CustomButton';
import { Fonts } from '../../assets/fonts';
import { font } from '../../utils/font';
import { correctSize } from '../../utils';
import { AnimatedWrapper } from '../../components/Animation';
import Banner from '../../components/home/Banner';
import { recomendedJobs } from '../../utils/array';
import { HorizontalFilterList } from '../../components/common/HorizontalFilterList';
import { useGetAllJobsQuery } from '../../services/applicationApi';
import { useNavigation } from '@react-navigation/native';
import { stackRoutes } from '../../navigation/screenIds';
import Toast from 'react-native-toast-message';
import JobCardSkeleton from '../../components/shimmers/JobCardSkeleton';
import { HomeNavProp } from '../../navigation/navigationTypes';
import { useProfile } from '../../hooks/useProfile';
import HorizontalJobCard from '../../components/home/HorizontalJobCard';
import HorizontalJobCardSkeleton from '../../components/shimmers/HorizontalJobCardSkeleton';
import { useGetTalentStatesQuery } from '../../services/profileAPI';
import { shareJobLink } from '../../utils/shareJobLink';
import Icons from '../../components/vectorIcons/Icons';
import SliderHorizontalIcon from '../../assets/svg/Home/SliderHorizontalIcon';
import CrossIcon from '../../components/vectorIcons/CrossIcon';
const Home = () => {
  const navigation = useNavigation<HomeNavProp>();
  // const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollRef = useRef<ScrollView>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [selectedId, setSelectedId] = useState(recomendedJobs[0].id);
  const params = useMemo( 
    () => ({ page, pageSize: 20, query: search }),
    [page, search],
  );

  const {
    isLoading,
    data: jobResponse,
    refetch,
    isError,
  } = useGetAllJobsQuery(params);
  const { data: states, isError: talentError } = useGetTalentStatesQuery();

  // ─── Memoized Values ───────────────────────────────────────────────────────

  const { profile } = useProfile();

  const userImage = useMemo(() => {
    if (profile?.avatarUrl) return `${ROUTES.MEDIA_URL}${profile.avatarUrl}`;
    const profileMedia = (
      profile?.media ??
      profile?.portfolioImages ??
      []
    ).find((m: any) => m.type === 'PROFILE');
    return profileMedia ? `${ROUTES.MEDIA_URL}${profileMedia.url}` : null;
  }, [profile]);

  const userName = useMemo(() => {
    return profile?.name?.split(' ')[0] || '';
  }, [profile]);


  const handleNotificationPress = useCallback(() => {
    navigation.navigate(stackRoutes.Notifications);
  }, [navigation]);

  const handleProfilePress = useCallback(() => {
    navigation.navigate(stackRoutes.UserProfile);
  }, [navigation]);

  const handleFilterPress = useCallback(() => {
    navigation.navigate(stackRoutes.Filter);
  }, [navigation]);

  const handleQuickActions = useCallback(
    (path: string) => {
      navigation.navigate(path as any);
    },
    [navigation],
  );

  const handleApplyJob = useCallback(
    (item: any) => {
      navigation.navigate(stackRoutes.ApplicationsDetail as any, {
        id: item.id,
      });
      // requestAnimationFrame(() => {
      //   actionSheetRef.current?.show();
      // });
    },
    [navigation],
  );

  const handleLoadMore = useCallback(() => {
    if (!isFetchingMore) {
      if (jobResponse?.data?.length === 0) {
        Toast.show({ type: 'info', text1: 'No more jobs to load' });
        return;
      }
      setIsFetchingMore(true);
      setPage(prev => prev + 1);
    }
  }, [isFetchingMore, jobResponse]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    setJobs([]);
    const result = await refetch();
    if (result?.data?.data) {
      setJobs(result.data.data);
    }
    setRefreshing(false);
  }, [refetch]);

  // ─── Effects ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (jobResponse?.data) {
      if (page === 1) {
        setJobs(jobResponse.data);
      } else {
        setJobs(prev => [...prev, ...jobResponse.data]);
        setIsFetchingMore(false);
      }
    }
  }, [jobResponse]);

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load jobs',
        text2: 'Please check your connection and try again.',
      });
    }
  }, [isError]);

  useEffect(() => {
    if (talentError) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load profile stats',
      });
    }
  }, [talentError]);

  const verticalSkeleton = useMemo(
    () => Array.from({ length: 5 }).map((_, i) => <JobCardSkeleton key={i} />),
    [],
  );

  const horizontalSkeleton = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => (
        <HorizontalJobCardSkeleton key={i} />
      )),
    [],
  );
  // useCallback so FlatList doesn't re-render rows unnecessarily
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <JobCard
        item={item}
        // index={index}
        onBookmark={() => console.log('Bookmark', item.id)}
        onApply={() => handleApplyJob(item)}
        onPress={() => handleApplyJob(item)}
        onShare={() =>
          Share.share({
            message: `Check out this job: ${shareJobLink}/${item.id}`,
            url: `${shareJobLink}/${item.id}`,
          })
        }
      />
    ),
    [handleApplyJob],
  );

  // useCallback so FlatList doesn't re-render rows unnecessarily
  const renderHorizontalItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <HorizontalJobCard
        item={item}
        // index={index}
        onBookmark={() => console.log('Bookmark', item.id)}
        onApply={() => handleApplyJob(item)}
        onPress={() => handleApplyJob(item)}
        onShare={() => console.log('Share', item.id)}
      />
    ),
    [handleApplyJob],
  );

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  // useMemo so the header/footer elements are not recreated on every render
  const renderListHeader = useMemo(
    () => (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>Recommended for You</Text>
        <Text style={styles.listHeaderSubText}>See All</Text>
      </View>
    ),
    [],
  );

  const renderListFooter = useMemo(
    () => (
      <View style={{ paddingHorizontal: correctSize(20) }}>
        {isFetchingMore ? (
          <ActivityIndicator color={colors.primary} size={24} />
        ) : (
          <CustomButton
            title="Load More Jobs"
            onPress={handleLoadMore}
            style={styles.button}
            textStyle={styles.buttonText}
          />
        )}
      </View>
    ),
    [isFetchingMore, handleLoadMore],
  );
  return (
    <ScreenWrapper
      statusBarColor={colors.darkgray_1}
      statusBarStyle="light-content"
      backgroundColor={colors.darkgray_1}
    >
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
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
        <View style={styles.mainContainer}>
          <HomeHeader
            userName={userName || '••••'}
            userImage={userImage}
            notificationCount={1}
            location={profile?.location}
            states={states}
            onFilterPress={handleFilterPress}
            onNotificationPress={handleNotificationPress}
            onProfilePress={handleProfilePress}
          >
            <View style={styles.searchContainer}>
              <Icons
                family="Ionicons"
                name="search"
                size={20}
                color={colors.gray_3}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search jobs, brands, categories..."
                placeholderTextColor={colors.gray_3}
                onChangeText={e => setSearch(e)}
                value={search}
              />

              {search?.length!=0? (
                <TouchableOpacity
                  style={styles.filterButton}
                  onPress={() => {setSearch('')}}
                  activeOpacity={0.8}
                >
                  <CrossIcon fillColor={colors.darkgray_1} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.filterButton}
                  onPress={() => {}}
                  activeOpacity={0.8}
                >
                  <SliderHorizontalIcon />
                </TouchableOpacity>
              )}
            </View>
          </HomeHeader>
          {/* <View style={styles.quickActions}>
            <QuickActions onQuickActionPress={handleQuickActions} />
          </View> */}

          <AnimatedWrapper style={styles.matchingCard}>
            <Banner totalMatchingJobs={states?.totalMatchingJobs} />
          </AnimatedWrapper>

          <View style={styles.hotPickJobs}>
            <View style={styles.hotPickListHeader}>
              <Text style={styles.listHeaderText}>Hot Picks</Text>
              <Text style={styles.listHeaderSubText}>See all</Text>
            </View>
            {(isLoading || refreshing) && jobs.length === 0 ? (
              <ScrollView
                horizontal
                contentContainerStyle={styles.horizontalListContainer}
              >
                {horizontalSkeleton}
              </ScrollView>
            ) : (
              <FlatList
                data={jobs}
                keyExtractor={keyExtractor}
                renderItem={renderHorizontalItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalListContainer}
              />
            )}
          </View>

          <View style={styles.filterBadgeContainer}>
            <HorizontalFilterList
              items={recomendedJobs}
              selectedId={selectedId}
              onSelectItem={setSelectedId}
            />
          </View>

          {/* <ScrollView ref={scrollRef} contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}> */}
          <View style={styles.listWrapper}>
            {(isLoading || refreshing) && jobs.length === 0 ? (
              <View style={styles.listContent}>{verticalSkeleton}</View>
            ) : (
              <FlatList
                data={jobs}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListHeaderComponent={() => renderListHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              />
            )}
          </View>
          {/* </ScrollView> */}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: correctSize(20),
    paddingHorizontal: correctSize(24),
  },
  horizontalListContainer: {
    gap: correctSize(12),
    paddingBottom: correctSize(12),
  },
  hotPickJobs: {
    marginHorizontal: correctSize(16),
    marginTop: correctSize(24),
    borderBottomWidth: 1,
    borderColor: colors.white_1,
  },
  listWrapper: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.lightBlue_5,
  },
  container: {
    flexGrow: 1,
    paddingBottom: correctSize(170),
    backgroundColor: colors.lightBlue_5,
  },
  listHeader: {
    paddingVertical: correctSize(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hotPickListHeader: {
    marginBottom: correctSize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listHeaderText: {
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    fontSize: 15,
  },
  listHeaderSubText: {
    ...font(12, 500, 'Inter'),
    color: colors.blue_5,
  },
  matchingCard: {
    marginVertical: correctSize(16),
    paddingHorizontal: correctSize(16),
    backgroundColor: colors.lightBlue_5,
  },
  quickActions: {
    paddingHorizontal: correctSize(24),
  },
  filterBadgeContainer: {
    paddingVertical: correctSize(12),
    marginHorizontal: correctSize(16),
    borderBottomWidth: 1,
    borderColor: colors.white_1,
  },
  button: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 16,
    textTransform: 'none',
    color: colors.black,
    textAlign: 'center',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white_rgb,
    borderWidth: 1,
    borderColor: colors.white_rgb1,
    borderRadius: 12,
    paddingHorizontal: correctSize(16),
    height: 56,
    marginVertical: correctSize(16),
  },
  searchIcon: {
    marginRight: correctSize(12),
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.Inter_Regular,
    fontSize: 14,
    color: colors.gray_4,
    height: '100%',
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: correctSize(8),
  },
});

export default Home;
