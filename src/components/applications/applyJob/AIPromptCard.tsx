import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import ShineIcon from '../../../assets/svg/Profile/ShineIcon';
import { correctSize } from '../../../utils';
import ChevronRight from '../../../assets/svg/common/ChevronRight';

const AIPromptCard = () => {
    const propmts = [
        "Why are you a great fit for this shoot?",
        "Share a relevant experience with a major brand.",
        "What excites you about this campaign?",
    ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ShineIcon width={11} height={11} color={colors.orange_4} />
        <Text style={styles.title}>AI Writing Prompts</Text>
      </View>

     {
        propmts.map((prompt, index) => (
            <TouchableOpacity key={index} style={styles.promptBtn} activeOpacity={0.7}>
                <Text style={styles.prompt}>{prompt}</Text>
                <ChevronRight width={12} height={12} color={colors.gray_5}/>
            </TouchableOpacity>
        ))  
     }
    </View>
  );
};

export default AIPromptCard;
const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    padding: correctSize(16),
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.darkgray_1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(5),
    marginBottom:correctSize(12)
  },
  promptBtn: {
    borderRadius: 14,
    borderWidth: 0.7,
    borderColor: 'rgba(0,0,0,0)',
    backgroundColor: '#F9FAFB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: correctSize(12),
    marginBottom:correctSize(8)
  },
  prompt: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
  },
});
