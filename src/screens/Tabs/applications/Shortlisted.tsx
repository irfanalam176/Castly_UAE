import { View, Text, FlatList, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import ApplicationCard from '../../../components/applications/ApplicationCard';
import { useNavigation } from '@react-navigation/native';
import screenIds from '../../../navigation/screenIds';
import { useGetAppliedProjectsQuery } from '../../../services/applicationApi';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import { font } from '../../../utils/font';
import { colors } from '../../../utils/colors';
import { AnimatedWrapper } from '../../../components/Animation';
import { useDispatch } from 'react-redux';
import { setPendingCount } from '../../../redux/reducers/applicationSlice';
import JobCardSkeleton from '../../../components/shimmers/JobCardSkeleton';
import { Fonts } from '../../../assets/fonts';
import { correctSize } from '../../../utils';

const SKELETON_COUNT = 5;

const ShortListed = () => {
  const params = useMemo(
    () => ({ page: 1, limit: 20, status: 'SHORTLISTED' }),
    [],
  );

  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const {
    isFetching,
    isError,
    data: jobResponse,
  } = useGetAppliedProjectsQuery(params, { refetchOnFocus: true });

  const items = jobResponse?.data?.items ?? [];

  useEffect(() => {
    if (!isFetching && !isError && jobResponse) {
      dispatch(setPendingCount(jobResponse?.data?.total ?? items.length));
    }
  }, [isFetching, isError, jobResponse]);

  // ─── Skeleton ──────────────────────────────────────────────────────────────

  const renderSkeleton = useMemo(
    () => (
      <View style={styles.skeletonContainer}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </View>
    ),
    [],
  );

  // ─── FlatList helpers ──────────────────────────────────────────────────────

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <AnimatedWrapper>
        <ApplicationCard
          item={item}
          onPress={() =>
            navigation.navigate(screenIds.stack.ApplicationsDetail, {
              id: item.id,
            })
          }
        />
      </AnimatedWrapper>
    ),
    [navigation],
  );

  const keyExtractor = useCallback((item: any) => item.id.toString(), []);

  const renderEmpty = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No applications found</Text>
      </View>
    ),
    [],
  );

  // ──────────────────────────────────────────────────────────────────────────

  if (isError) {
    return (
      <ScreenWrapper>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Something went wrong</Text>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      {isFetching && items.length === 0 ? (
        renderSkeleton
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flexGrow: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: correctSize(24),
    paddingBottom: correctSize(120),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize:16,
    fontFamily:Fonts.Inter_Medium,
    color: colors.gray_1,
  },
});

export default ShortListed;