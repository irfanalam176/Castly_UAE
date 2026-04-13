import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../../../assets/fonts';
import { colors } from '../../../../utils/colors';
import { correctSize } from '../../../../utils';
import CompanyInfoCard from '../../../../components/applications/applyJob/CompanyInfoCard';
import ApplicationSummaryCard from '../../../../components/applications/applyJob/ApplicationSummaryCard';
import CheckListCard from '../../../../components/applications/CheckListCard';
import CalendarIcon from '../../../../assets/svg/common/CalendarIcon';
import CameraIcon from '../../../../assets/svg/common/CameraIcon';
import MessageSquareIcon from '../../../../assets/svg/common/MessageSquareIcon';
import { formatDate } from '../../../../utils/formatDate';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/stores/store';
import { SlideLeftFade } from '../../../../components/Animation';
import UserIcon from '../../../../assets/svg/common/UserIcon';

const Review = ({ id }: { id: string }) => {
  const { data: progress } = useSelector(
    (state: RootState) => state.applyJobProgress,
  );

  const days = useSelector((state: RootState) => state.availability.days);
  const selections = useSelector(
    (state: RootState) => state.portfolio.selections,
  );
  const message = useSelector((state: RootState) => state.message.message);

  const job = progress?.job;
  const brand = job?.brand;

  const availabilityList = days.map((d: any) => `Day ${d.dayNumber}`);
  const portfolioList = selections.map((s: any, i: any) => `Sample ${i + 1}`);
  const messageList = [message.trim() ? message : 'No message written yet'];
  const confirmedDays = days.filter((d: any) => d.confirmed).length;
  const confirmProfile = useSelector(
    (state: RootState) => state.confirmProfile,
  );

  const profileList = [
    confirmProfile?.fullName,
    `${confirmProfile?.phoneNumberPrefix} ${confirmProfile?.phoneNumber}`,
    confirmProfile.email,
    `Height: ${confirmProfile?.height}cm · Size: ${confirmProfile?.clothingSize}`,
    `Shoe: EU ${confirmProfile?.shoeSize}`,
  ].filter(Boolean);
  const STAGGER = 150;
  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <Text style={styles.title}>Review Application</Text>
        <Text style={styles.subHeading}>
          Double-check everything before you submit.
        </Text>
      </SlideLeftFade>

      <SlideLeftFade delay={STAGGER * 2}>
        <CompanyInfoCard
          initial={brand?.brandName?.[0]?.toUpperCase()}
          jobTitle={job?.title || '...'}
          companyName={brand?.brandName || '...'}
          salary={`AED ${job?.totalBudget || '0'}`}
          time={`${job?.shootDays || 0} Days`}
        />
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER * 3}>
        <ApplicationSummaryCard
          jobTitle={job?.title || '...'}
          companyInfo={`${brand?.brandName || '...'} · ${
            formatDate(job?.startDate) || '...'
          }–${formatDate(job?.endDate) || '...'}`}
          price={`AED ${job?.totalBudget || '0'}`}
          daysConfirmed={`${confirmedDays}/${days.length} days confirmed`}
          samples={`${selections.length} sample${
            selections.length !== 1 ? 's' : ''
          }`}
        />
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER * 4}>
        <CheckListCard
          bgColor={colors.lightBlue_2}
          icon={<UserIcon />}
          list={profileList}
          title="Profile"
        />
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER * 5}> 
        <CheckListCard
          bgColor={colors.green_1}
          icon={<CalendarIcon />}
          list={availabilityList}
          title="Availability"
        />
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER * 6}>
        <CheckListCard
          bgColor={colors.purple_7}
          icon={<CameraIcon width={14} height={14} color={colors.purple_8} />}
          list={portfolioList}
          title="Portfolio"
        />
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER * 7}>
        <CheckListCard
          bgColor={colors.light_red2}
          icon={<MessageSquareIcon />}
          list={messageList}
          title="Message"
        />
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER * 8}>
        <View style={styles.termsContainer}>
          <Text style={styles.terms}>
            By submitting, you agree to Castly's{" "}
            <Text style={styles.termsLink} onPress={() => {}}>
              Terms of Service
            </Text>{" "}
            and confirm your application information is accurate.
          </Text>
        </View>
      </SlideLeftFade>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 20,
    color: colors.darkgray_1,
  },
  subHeading: {
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
    marginBottom: correctSize(16),
  },
  terms: {
    color: colors.gray_4,
    textAlign: 'center',
    fontFamily: Fonts.Inter_Regular,
    fontSize: correctSize(11),
    lineHeight: correctSize(18),
  },
  termsContainer: {
    borderRadius: correctSize(14),
    borderWidth: correctSize(1.2),
    borderColor: colors.gray,
    backgroundColor: colors.lightBlue_5,
    padding: correctSize(13),
  },
  termsLink: {
    color: colors.blue_5,
    fontFamily: Fonts.Inter_Medium,
  },
});
