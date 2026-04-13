            // THESE ARE THE OTHER CARDS WILL SHOW BASED ON THE NOTIFICATION  TYPE, FOR NOW JUST SHOWING ONE CARD AS EXAMPLE
            {/* <HighLightCard
              title={'Shortlisted'}
              description={`You've been shortlisted for "Commercial Actor - Tech Brand" by Dubai Media Productions`}
              titleSize={16}
              descriptionSize={14}
              footer={true}
              icon={'circle-check'}
              iconFamily={'FontAwesome6'}
              iconColor={colors.white}
              iconBg={colors.gray_1}
              bgColor={colors.white}
              borderColor={colors.lightBlue_3}
              status={true}
              statusColor={colors.darkGreen3}
              //   footer props
              footerLable={'1 hour ago'}
              footerBtnColor={''}
              footerBtnText={'View Details'}
              footerBtnTextColor={colors.darkgray}
            />
            <HighLightCard
              title={'Booking Confirmed'}
              description={`Your booking for "Event Host - Product Launch" is confirmed for Dec 15, 2024`}
              titleSize={16}
              descriptionSize={14}
              footer={true}
              icon={'calendar-check'}
              iconFamily={'FontAwesome6'}
              iconColor={colors.white}
              iconBg={colors.gray_1}
              bgColor={colors.white}
              outerChildren={false}
              borderColor={colors.lightBlue_3}
              status={true}
              statusColor={colors.blue_1}
              //   footer props
              footerLable={'1 hour ago'}
              footerBtnColor={''}
              footerBtnText={'View Details'}
              footerBtnTextColor={colors.darkgray}
            >
              <AmountCard
                bgColor={colors.lightBlue_7}
                borderColor={colors.lightBlue_8}
                contentColor={colors.blue_2}
                label1Size={12}
                label2Size={12}
                value1Size={12}
                value2Size={12}
                lable1FontFamily={Fonts.Inter_Medium}
                lable2FontFamily={Fonts.Inter_Medium}
                value1FontFamily={Fonts.Inter_SemiBold}
                value2FontFamily={Fonts.Inter_SemiBold}
                lable1={'Shoot Date'}
                value1={'Dec 15, 2024'}
                lable2={'Payment'}
                value2={'AED 3,500'}
              />
            </HighLightCard>
            <Text style={styles.dateText}>Yesterday</Text>
            <HighLightCard
              title={'Payment Released'}
              description={`AED 2,800 has been released to your account for "Fashion Show Model"`}
              titleSize={16}
              descriptionSize={14}
              footer={true}
              icon={'money-bill-wave'}
              iconFamily={'FontAwesome6'}
              iconColor={colors.white}
              iconBg={colors.gray_1}
              bgColor={colors.white}
              outerChildren={false}
              borderColor={colors.lightBlue_3}
              statusColor={colors.blue_1}
              //   footer props
              footerLable={'1 hour ago'}
              footerBtnColor={''}
              footerBtnText={'View Details'}
              footerBtnTextColor={colors.darkgray}
            >
              <AmountCard
                bgColor={colors.green_3}
                borderColor={colors.lightGreen_2}
                contentColor={colors.darkGreen}
                label1Size={12}
                label2Size={12}
                value1Size={14}
                value2Size={12}
                lable1FontFamily={Fonts.Inter_Medium}
                lable2FontFamily={Fonts.Inter_Medium}
                value1FontFamily={Fonts.Inter_Bold}
                value2FontFamily={Fonts.Inter_Bold}
                lable1={'Amount'}
                value1={'AED 2,800'}
                lable2={'Status'}
                value2={'Completed'}
                status={true}
                statusColor={colors.darkGreen_2}
              />
            </HighLightCard>
            <HighLightCard
              title={'New Review'}
              description={`Emirates Fashion Hub left you a 5- star review for your recent work`}
              titleSize={16}
              descriptionSize={14}
              footer={true}
              icon={'star'}
              iconFamily={'FontAwesome6'}
              iconColor={colors.white}
              iconBg={colors.gray_1}
              bgColor={colors.white}
              outerChildren={false}
              borderColor={colors.lightBlue_3}
              statusColor={colors.blue_1}
              //   footer props
              footerLable={'Yesterday, 10:15 AM'}
              footerBtnColor={''}
              footerBtnText={'View Review'}
              footerBtnTextColor={colors.darkgray}
            >
              <View style={styles.rating}>
                {[...Array(6)].map((_, index) => (
                  <Icons
                    key={index}
                    name="star"
                    size={20}
                    color={colors.orange}
                    family="FontAwesome6"
                  />
                ))}
              </View>
            </HighLightCard>

            <HighLightCard
              title={'Application Viewed'}
              description={`Luxury Brands UAE viewed your application for "Brand Ambassador"`}
              titleSize={16}
              descriptionSize={14}
              footer={true}
              icon={'briefcase'}
              iconFamily={'FontAwesome6'}
              iconColor={colors.white}
              iconBg={colors.gray_1}
              bgColor={colors.white}
              borderColor={colors.lightBlue_3}
              statusColor={colors.gray_1}
              //   footer props
              footerLable={'Yesterday, 9:20 AM'}
              footerBtnText={'View Job'}
              footerBtnTextColor={colors.darkgray}
            />
            <Text style={styles.dateText}>Earlier This Week</Text>
            <HighLightCard
              title={'Profile Boost Available'}
              description={`Boost your profile to appear in top search results for 7 days`}
              titleSize={16}
              descriptionSize={14}
              footer={true}
              icon={'bell'}
              iconFamily={'FontAwesome6'}
              iconColor={colors.white}
              iconBg={colors.gray_1}
              bgColor={colors.white}
              borderColor={colors.lightBlue_3}
              statusColor={colors.gray_1}
              //   footer props
              footerBtnColor={colors.primary}
              footerLable={'Dec 8, 2024'}
              footerBtnText={'Boost Now'}
              footerBtnTextColor={colors.black}
            />

            <HighLightCard
              title={'KYC Verification Approved'}
              description={`Your Emirates ID verification has been successfully approved`}
              titleSize={16}
              descriptionSize={14}
              footer={true}
              icon={'shield-halved'}
              iconFamily={'FontAwesome6'}
              iconColor={colors.white}
              iconBg={colors.gray_1}
              bgColor={colors.white}
              borderColor={colors.lightBlue_3}
              statusColor={colors.gray_1}
              verified={true}
              footerBtn={false}
              //   footer props
              footerBtnColor={colors.primary}
              footerLable={'Dec 7, 2024'}
              footerBtnText={'Boost Now'}
              footerBtnTextColor={colors.black}
            />  */}
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import NavBar from '../components/common/NavBar';
import { colors } from '../utils/colors';
import { notifacationsFilterList } from '../utils/array';
import HighLightCard from '../components/common/HighLightCard';
import { HorizontalFilterList } from '../components/common/HorizontalFilterList';
import { correctSize } from '../utils';
import { AnimatedWrapper } from '../components/Animation';
import { useGetAllNotificationsQuery } from '../services/notificationsApi';
import { formatTime } from '../utils/formatTime';

const PAGE_LIMIT = 20;

const Notifications = () => {
  const [selectedId, setSelectedId]         = useState(notifacationsFilterList[0].id);
  const [page, setPage]                     = useState(1);
  const [allItems, setAllItems]             = useState<any[]>([]);
  const [hasMore, setHasMore]               = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { isLoading, isFetching, data: notificationsResponse } = useGetAllNotificationsQuery({
    page,
    limit: PAGE_LIMIT,
    unreadOnly: false,
  });

  
  useEffect(() => {
    const items = notificationsResponse?.data?.items ?? [];
    const total = notificationsResponse?.data?.total ?? 0;

    if (items.length > 0) {
      setAllItems(prev => page === 1 ? items : [...prev, ...items]);
      setHasMore(allItems.length + items.length < total);
    } else if (page === 1) {
      setAllItems([]);
      setHasMore(false);
    }
    setIsFetchingMore(false);
  }, [notificationsResponse]);

  useEffect(() => {
    setPage(1);
    setAllItems([]);
    setHasMore(true);
  }, [selectedId]);

  const loadMore = useCallback(() => {
    if (!isFetching && !isFetchingMore && hasMore) {
      setIsFetchingMore(true);
      setPage(prev => prev + 1);
    }
  }, [isFetching, isFetchingMore, hasMore]);

  return (
    <ScreenWrapper>
      <NavBar
        title="Notifications"
        hideLeftIcon={false}
        showRightIcon={true}
        rightIconName="ellipsis-vertical"
        rightIconFamily="FontAwesome6"
        rightIconColor={colors.black}
        rightButtonColor={''}
        border={false}
        onRightPress={() => {}}
      />

      <View style={styles.filterContainer}>
        <HorizontalFilterList
          items={notifacationsFilterList}
          selectedId={selectedId}
          onSelectItem={setSelectedId}
        />
      </View>

      <FlatList
        data={allItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        renderItem={({ item }) => (
          <AnimatedWrapper>
            <HighLightCard 
              title={item?.title}
              description={item?.body}
              titleSize={16}
              descriptionSize={14}
              footer={true}
              icon={'circle-question'}
              iconFamily={'FontAwesome6'}
              iconColor={colors.white}
              iconBg={colors.gray_1}
              bgColor={colors.white}
              borderColor={colors.lightBlue_3}
              status={true}
              statusColor={colors.gray_1}
              //   footer props
              footerLable={formatTime(item?.createdAt)}
              footerBtnColor={colors.primary}
              footerBtnText={'View Role'}
              footerBtnTextColor={colors.black}
            />
          </AnimatedWrapper>
        )}
        ListHeaderComponent={
          isLoading && page === 1 ? (
            <ActivityIndicator size="large" color={colors.purple} style={styles.loader} />
          ) : null
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.centered}>
              <Text style={styles.emptyText}>No notifications yet</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size="small" color={colors.purple} style={styles.loader} />
          ) : null
        }
      />
    </ScreenWrapper>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.lightBlue_5,
    paddingHorizontal: correctSize(24),
    paddingTop: correctSize(16),
    paddingBottom: correctSize(150),
    flexGrow: 1,
  },
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingBottom: 21,
    paddingHorizontal: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: correctSize(60),
  },
  emptyText: {
    fontSize: 14,
    color: colors.gray_3,
  },
  loader: {
    marginVertical: correctSize(16),
  },
});