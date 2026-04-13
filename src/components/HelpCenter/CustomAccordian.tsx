import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { colors } from '../../utils/colors';
import CheveronDown from '../../assets/svg/kyc/CheveronDown';

interface Section {
  title: string;
  content: string;
}

interface CustomAccordionProps {
  data: Section[];
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({ data }) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const updateSections = (index: number) => {
    setActiveSections(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [index]
    );
  };

  const renderHeader = (section: Section, index: number, isActive: boolean) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => updateSections(index)}
      style={[
        styles.headerRow,
        isActive && styles.headerRowActive, // remove bottom border if active
      ]}
    >
      <Text style={styles.title}>{section.title}</Text>
      <CheveronDown
        color={colors.gray_3}
        style={{
          transform: [{ rotate: isActive ? '180deg' : '0deg' }],
        }}
      />
    </TouchableOpacity>
  );

  const renderContent = (section: Section) => (
    <View style={styles.content}>
      <Text style={styles.description}>{section.content}</Text>
    </View>
  );

  return (
    <>
      {data.map((section, index) => {
        const isActive = activeSections.includes(index);
        return (
          <View key={index} style={styles.accordionWrapper}>
            {renderHeader(section, index, isActive)}
            {isActive && renderContent(section)}
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  accordionWrapper: {
    borderRadius: 12,
    borderWidth: correctSize(2),
    borderColor: colors.gray,
    backgroundColor: colors.white,
    marginBottom: correctSize(12),
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: correctSize(18),
    borderBottomWidth: 1, 
    borderBottomColor: colors.gray,
  },
  headerRowActive: {
    borderBottomWidth: 0, 
  },
  content: {
    padding: correctSize(18),
    paddingTop:0
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray_1,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
});

export default CustomAccordion;
