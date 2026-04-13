import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import TalentCard from '../../components/onboarding/TalentCard';
import { SlideLeftFade } from '../../components/Animation';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '../../redux/reducers/onboardingSlice';
import { RootState } from '../../redux/stores/store';

const TALENTS = [
  { id: 1, title: 'Fashion Model', emoji: '👗' },
  { id: 2, title: 'Fitness Model', emoji: '💪' },
  { id: 3, title: 'Brand Ambassador', emoji: '🌟' },
  { id: 4, title: 'Content Creator', emoji: '📱' },
  { id: 5, title: 'Actor', emoji: '🎬' },
  { id: 6, title: 'Commercial', emoji: '📺' },
  { id: 7, title: 'Runway Model', emoji: '👠' },
  { id: 8, title: 'Presenter / Host', emoji: '🎤' },
];

const STAGGER = 100;

const Talent = () => {
  const dispatch = useDispatch();
  const talent = useSelector((state: RootState) => state.onboarding.talent);

  return (
    <FlatList
      data={TALENTS}
      keyExtractor={item => item.id.toString()}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.list}
      renderItem={({ item, index }) => (
        <SlideLeftFade delay={STAGGER * (index + 1)} style={styles.cardWrapper}>
          <TalentCard
            title={item.title}
            image={item.emoji}
            selected={talent === item.title}
            onPress={() => dispatch(setField({ talent: item.title }))}
          />
        </SlideLeftFade>
      )}
    />
  );
};

export default Talent;

const styles = StyleSheet.create({
  list: { gap: correctSize(8) },
  row: { gap: correctSize(8) },
  cardWrapper: { flex: 1 },
});
