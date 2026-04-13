import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import { correctSize } from '../../../utils';
import { Fonts } from '../../../assets/fonts';
import { colors } from '../../../utils/colors';
import MyJobFilters from '../../../components/myJobs/MyJobFilters';
import MyJobCard, {
  ApplicationItem,
} from '../../../components/myJobs/MyJobCard';
import { useGetMyJobsQuery } from '../../../services/applicationApi';
import { MyJobsSkeletonList } from '../../../components/shimmers/MyJobCardSkeleton';
import { useNavigation } from '@react-navigation/native';
import { NavProp } from '../../../navigation/navigationTypes';
import { stackRoutes } from '../../../navigation/screenIds';

type ApiStatus =
  | 'ALL'
  | 'APPLIED'
  | 'SHORTLISTED'
  | 'BOOKED'
  | 'DONE'
  | 'PASSED';

interface FilterOption {
  label: string;
  apiStatus: ApiStatus;
}

const filters: FilterOption[] = [
  { label: 'All', apiStatus: 'ALL' },
  { label: 'Applied', apiStatus: 'APPLIED' },
  { label: '★ Shortlisted', apiStatus: 'SHORTLISTED' },
  { label: 'Booked', apiStatus: 'BOOKED' },
  { label: 'Done', apiStatus: 'DONE' },
  { label: 'Passed', apiStatus: 'PASSED' },
];

const MyJobs = () => {
  const navigation = useNavigation<NavProp>()
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>(
    filters[0],
  );

  const { data, isLoading, isError, refetch } = useGetMyJobsQuery({
    status: selectedFilter.apiStatus,
  });

  const items: ApplicationItem[] = data?.items ?? [];
  const totalApplications = data?.totalApplications ?? 0;
  const counts: { status: string; count: number }[] = data?.counts ?? [];

  const [refreshing, setRefreshing] = useState(false);

  const getCount = (apiStatus: ApiStatus) =>
    counts.find(c => c.status === apiStatus)?.count ?? 0;

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
     await refetch().unwrap(); 
    } catch (e) {
      console.log('Refresh error:', e);
    } finally {
      setRefreshing(false);
      setSelectedFilter(filters[0])
    }
  };
  function handleJobPress(id:string){
    navigation.navigate(stackRoutes.BookingDetails,{id})
  }
  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>My Jobs</Text>
        <Text style={styles.totalApplications}>
          {totalApplications} application{totalApplications !== 1 ? 's' : ''}{' '}
          total
        </Text>

        <ScrollView
          contentContainerStyle={styles.filters}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {filters.map(filter => (
            <MyJobFilters
              key={filter.apiStatus}
              label={filter.label}
              count={String(getCount(filter.apiStatus))}
              selected={selectedFilter.apiStatus === filter.apiStatus}
              onPress={() => setSelectedFilter(filter)}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
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
        {isLoading || refreshing? (
          <MyJobsSkeletonList count={3} />
        ) : isError ? (
          <Text style={styles.emptyText}>
            Something went wrong. Please try again.
          </Text>
        ) : items.length === 0 ? (
          <Text style={styles.emptyText}>No jobs found for this filter.</Text>
        ) : (
          items.map(item => (
            <View key={item.applicationId} style={styles.cardWrapper}>
              <MyJobCard item={item} onPress={()=>handleJobPress(item?.applicationId)}/>
            </View>
          ))
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default MyJobs;

const styles = StyleSheet.create({
  container: {
    padding: correctSize(16),
    backgroundColor: colors.lightBlue_5,
    flexGrow: 1,
  },
  header: {
    padding: correctSize(16),
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(30),
  },
  totalApplications: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(6),
    marginTop: correctSize(12),
  },
  cardWrapper: {
    marginBottom: correctSize(12),
  },
  emptyText: {
    textAlign: 'center',
    marginTop: correctSize(40),
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  loader: {
    marginTop: correctSize(40),
  },
});
