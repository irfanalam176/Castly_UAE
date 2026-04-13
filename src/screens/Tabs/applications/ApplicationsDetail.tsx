import {
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../../components/layout/ScreenWrapper';
import { colors } from '../../../utils/colors';
import ApplicationHeaderCard from '../../../components/applications/ApplicationHeaderCard';
import ApplicationDetailCard from '../../../components/applications/ApplicationDetailCard';
import PaymentDurationCard from '../../../components/applications/PaymentDurationCard';
import { correctSize } from '../../../utils';
import ApplicationInfoCard from '../../../components/applications/ApplicationInfoCard';
import LocationCard from '../../../components/applications/LocationCard';
import { Fonts } from '../../../assets/fonts';
import ShootScheduleCard from '../../../components/applications/ShootScheduleCard';
import CompensationCard from '../../../components/applications/CompensationCard';
import RequirementsCard from '../../../components/applications/RequirementsCard';
import ProvidedCard from '../../../components/applications/ProvidedCard';
import ClothIcon from '../../../assets/svg/Profile/ClothIcon';
import CameraIcon from '../../../assets/svg/common/CameraIcon';
import ShineIcon from '../../../assets/svg/Profile/ShineIcon';
import FlashIcon from '../../../assets/svg/Profile/FlashIcon';
import HeartIcon from '../../../assets/svg/Profile/HeartIcon';
import FAQ from '../../../components/applications/FAQ';
import ChatIcon from '../../../assets/svg/tabs/ChatIcon';
import CustomButton from '../../../components/common/CustomButton';
import FlashIconFill from '../../../assets/svg/Profile/FlashIconFill';
import { stackRoutes } from '../../../navigation/screenIds';
import { useGetSpecificJobsQuery } from '../../../services/applicationApi';
import { SlideLeftFade } from '../../../components/Animation';
import { useDispatch } from 'react-redux';
import { setJobData } from '../../../redux/reducers/JobDataSlice';
import ApplicationsDetailSkeleton from '../../../components/shimmers/ApplicationsDetailSkeleton';
import { shareJobLink } from '../../../utils/shareJobLink';
import Toast from 'react-native-toast-message';

interface ApplicationsDetailScreenProps {
  route: any;
  navigation: any;
}
export default function ApplicationsDetail({
  route,
  navigation,
}: ApplicationsDetailScreenProps) {
  const dispatch = useDispatch();
  const { id: jobId } = route.params || {};
  const { data, refetch, isError } = useGetSpecificJobsQuery({ id: jobId });
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }

  function handleNavigation() {
    navigation.navigate(stackRoutes.ApplyJobScreen, {
      id: jobId,
      matchPercent: data?.matchPct,
      createdAt: data?.createdAt,
    });
  }

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Failed to load jobs Details',
        text2: 'Please check your connection and try again.',
      });
    }
  }, [isError]);

  useEffect(() => {
    if (data) {
      dispatch(setJobData(data));
    }
  }, [data, dispatch]);
  const STAGGER = 150;

  if (!data) {
    return <ApplicationsDetailSkeleton />;
  }
  return (
    <ScreenWrapper
      backgroundColor={colors.lightBlue_5}
      statusBarStyle="light-content"
      statusBarColor="transparent"
      edges={['bottom']}
    >
      <ApplicationHeaderCard
        item={data}
        onBookmark={() => console.log('Bookmark', jobId)}
        navigation={navigation}
        onShare={() =>
          Share.share({
            message: `Check out this job: ${shareJobLink}/${jobId}`,
            url: `${shareJobLink}/${jobId}`,
          })
        }
      />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            progressBackgroundColor={colors.darkgray_1}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <SlideLeftFade delay={STAGGER * 2}>
          <ApplicationDetailCard item={data} />
        </SlideLeftFade>

        <SlideLeftFade delay={STAGGER * 3}>
          <PaymentDurationCard item={data} />
        </SlideLeftFade>

        <SlideLeftFade delay={STAGGER * 4}>
          <ApplicationInfoCard heading="Location">
            <LocationCard
              location={data?.brand?.brandLocation}
              locationDetail={'...'}
              country={data?.brand?.brandCountry}
              parking={data?.additionalNotes}
            />
          </ApplicationInfoCard>
        </SlideLeftFade>

        {/* <SlideLeftFade delay={STAGGER * 5}>
          <ApplicationInfoCard heading="Shoot Schedule">
            <ShootScheduleCard item={data} />
          </ApplicationInfoCard>
        </SlideLeftFade> */}

        <SlideLeftFade delay={STAGGER * 6}>
          <ApplicationInfoCard heading="Compensation">
            <CompensationCard item={data} />
          </ApplicationInfoCard>
        </SlideLeftFade>

        <SlideLeftFade delay={STAGGER * 7}>
          <ApplicationInfoCard heading="About This Job">
            <View>
              <Text style={styles.jobDescription}>
                {data?.description || ''}
              </Text>
            </View>
          </ApplicationInfoCard>
        </SlideLeftFade>

        {/* <SlideLeftFade delay={STAGGER * 8}>
          <ApplicationInfoCard heading="Requirements">
            <RequirementsCard item={data} />
          </ApplicationInfoCard>
        </SlideLeftFade> */}

        {/* <SlideLeftFade delay={STAGGER * 9}>
          <ApplicationInfoCard heading={`What's Provided`}>
            <View style={styles.providedGrid}>
              <ProvidedCard
                icon={<ClothIcon />}
                text="All wardrobe & styling provided by Nike"
                bgColor={colors.purple_7}
              />
              <ProvidedCard
                icon={
                  <CameraIcon width={16} height={16} color={colors.blue_7} />
                }
                text="Professional hair & makeup artists on site"
                bgColor={colors.lightBlue_7}
              />
              <ProvidedCard
                icon={<ShineIcon />}
                text="Catering & refreshments throughout all days"
                bgColor={colors.lightYellow}
              />
              <ProvidedCard
                icon={
                  <FlashIcon
                    width={13}
                    height={13}
                    color={colors.darkGreen_7}
                  />
                }
                text="Professional BTS photos sent after shoot"
                bgColor={colors.green_1}
              />
            </View>
          </ApplicationInfoCard>
        </SlideLeftFade> */}

        {/* <SlideLeftFade delay={STAGGER * 10}>
          <ApplicationInfoCard heading={`Perks & Benefits`}>
            <View style={styles.benifits}>
              <HeartIcon />
              <Text style={styles.benifitsText}>
                Nike gear gifted after the shoot (worth AED 800+)
              </Text>
            </View>
            <View style={styles.benifits}>
              <HeartIcon />
              <Text style={styles.benifitsText}>
                Nike gear gifted after the shoot (worth AED 800+)
              </Text>
            </View>
          </ApplicationInfoCard>
        </SlideLeftFade> */}

        {/* <SlideLeftFade delay={STAGGER * 11}>
          <ApplicationInfoCard heading={`FAQs from Brand`}>
            <FAQ
              question="Can I bring a manager or agent?"
              answer="Yes one representative is welcome and sit all the time"
            />
            <FAQ
              question="Can I bring a manager or agent?"
              answer="Yes one representative is welcome and sit all the time"
            />
          </ApplicationInfoCard>
          <Text style={styles.jobIdText}>Job ID: JP-2024-1182 · 312 views</Text>
        </SlideLeftFade> */}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.chatBtn}>
          <ChatIcon width={18} height={18} color={colors.darkgray} />
        </TouchableOpacity>
        <CustomButton
          icon={<FlashIconFill width={16} height={16} color={colors.black} />}
          title={`Apply Now — ${data?.currency} ${
            data?.rateType == 'HOURLY' ? data?.hourlyRate : data?.dailyRate
          }/${data?.rateType == 'HOURLY' ? 'hour' : 'day'}`}
          style={styles.applyBtn}
          onPress={handleNavigation}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: correctSize(16),
    paddingBottom: correctSize(20),
  },
  jobDescription: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 13,
    color: colors.darkgray,
    lineHeight: 21,
  },
  providedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: correctSize(10),
  },
  benifits: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(10),
    marginBottom: correctSize(10),
  },
  benifitsText: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
    lineHeight: 20,
    flex: 1,
  },
  jobIdText: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 11,
    color: colors.gray_3,
    textAlign: 'center',
  },
  chatBtn: {
    width: correctSize(48),
    height: correctSize(48),
    backgroundColor: colors.white_1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: correctSize(20),
    gap: correctSize(8),
    paddingVertical: correctSize(13),
    backgroundColor: colors.white,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});
