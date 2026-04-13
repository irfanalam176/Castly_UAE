import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Fonts } from '../../../../assets/fonts';
import { colors } from '../../../../utils/colors';
import { correctSize } from '../../../../utils';
import MessageCard from '../../../../components/applications/applyJob/MessageCard';
import AIPromptCard from '../../../../components/applications/applyJob/AIPromptCard';
import { SlideLeftFade } from '../../../../components/Animation';

const Message = () => {
  const STAGGER = 150
  return (
    <View>
     <SlideLeftFade delay={STAGGER * 1}>
       <Text style={styles.title}>Write a Message</Text>
      <Text style={styles.subHeading}>
        Stand out with a personal note to the brand.
      </Text>
     </SlideLeftFade>

      <SlideLeftFade delay={STAGGER*2}>
        <MessageCard/>
      </SlideLeftFade>
      <SlideLeftFade delay={STAGGER*3}>
      <AIPromptCard/>
      </SlideLeftFade>
    </View>
  );
};

export default Message;
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
});
