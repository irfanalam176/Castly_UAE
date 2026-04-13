import { View, Text } from 'react-native';
import React from 'react';
import ScoreCard from './ScoreCard';
import BookingStatCard from './BookingStatCard';
import TrustAndVerification from './TrustAndVerification';
import { SlideLeftFade } from '../../Animation';

const STAGGER = 150;

const MyStatsTab = () => {
  return (
    <View>
      <SlideLeftFade delay={STAGGER * 1}>
        <ScoreCard />
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER * 2}>
        <BookingStatCard />
      </SlideLeftFade>
      {/* <SlideLeftFade delay={STAGGER * 3}>
        <TrustAndVerification />
      </SlideLeftFade> */}
    </View>
  );
};

export default MyStatsTab;
