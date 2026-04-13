import { View } from 'react-native';
import React, { useRef } from 'react';
import AboutMeCard from './AboutMeCard';
import Gallery from './Gallery';
import MeasurementCard from './MeasurementCard';
import AvailabilityCard from './AvailabilityCard';
import SocialMediaCard from './SocialMediaCard';
import { SlideLeftFade } from '../../Animation';
import { ActionSheetRef } from 'react-native-actions-sheet';
import EditActionSheet from '../EditProfile/EditActionSheet';
import { useProfile } from '../../../hooks/useProfile';
import AddAccountActionSheet from './AddAccountActionSheet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/stores/store';

const STAGGER = 150;

const PortfolioTab = () => { 
  
  const { profile } = useProfile();
  const sheetRef = useRef<ActionSheetRef>(null);
  const addSheetRef = useRef<ActionSheetRef>(null);

  function handleEdit() {
    sheetRef.current?.show();
  }
  function handleAddAccount() { 
    addSheetRef.current?.show();
  }

  return (
    <View>
      <EditActionSheet actionSheetRef={sheetRef} />
      <AddAccountActionSheet actionSheetRef={addSheetRef}/>
      {/* 1 — About Me */}
      <SlideLeftFade delay={STAGGER * 1}>
        <AboutMeCard
          onPress={handleEdit}
          bio={profile?.bio}
          languages={profile?.languages}
        />
      </SlideLeftFade>

      {/* 2 — Gallery */}
      <SlideLeftFade delay={STAGGER * 2}>
        <Gallery
          portfolioImages={
            profile?.portfolioImages?.map(item => item.url) ?? []
          }
        />
      </SlideLeftFade>

      {/* 3 — Measurements */}
      <SlideLeftFade delay={STAGGER * 3}>
        <MeasurementCard
          onPress={handleEdit}
          height={profile?.height}
          weight={profile?.weight}
          bust={profile?.bust}
          waist={profile?.waist}
          hips={profile?.hips}
          shoeSize={profile?.shoeSize}
          clothingSize={profile?.clothingSize}
          experience={profile?.experience || "0 Years"} 
        />
      </SlideLeftFade>

      {/* 4 — Availability */}
      <SlideLeftFade delay={STAGGER * 4}>
     <AvailabilityCard availableDays={profile?.availability ?? []} />
      </SlideLeftFade>

      {/* 5 — Social Media */}
      <SlideLeftFade delay={STAGGER * 5}>
        <SocialMediaCard onPress={handleEdit} onAddAccount={handleAddAccount}/>
      </SlideLeftFade>
    </View>
  );
};

export default PortfolioTab;
