import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/colors';
import NavBar from '../../components/common/NavBar';
import CustomInput from '../../components/common/CustomInput';
import SearchIcon from '../../assets/svg/kyc/SearchIcon';
import { correctSize } from '../../utils';
import QuickAction from '../../components/HelpCenter/QuickAction';
import HeadPhoneIcon from '../../assets/svg/kyc/HeadPhoneIcon';
import FlagIcon from '../../assets/svg/kyc/FlagIcon';
import { Fonts } from '../../assets/fonts';
import { helpResourcesList, popularTopicsList } from '../../utils/array';
import ActionCard from '../../components/HelpCenter/ActionCard';
import ResourceCard from '../../components/HelpCenter/ResourceCard';
import CustomAccordion from '../../components/HelpCenter/CustomAccordian';
import HelpCard from '../../components/HelpCenter/HelpCard';
import { AnimatedWrapper } from '../../components/Animation';

const HelpCenter = () => {

  const SECTIONS = [
  { title: 'How long does it take to get verified?t', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.` },
  { title: 'When do I receive payment after a job?', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.` },
  { title: 'Can I cancel an accepted job?', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.` },
  { title: 'How does AI matching work?', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.` },
  { title: 'Are there any fees for talent?', content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.` },
  { title: `What if a brand doesn't pay?`, content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`  },
];

  return (
    <ScreenWrapper>
      <LinearGradient
        colors={[colors.lightBlue_2, colors.white]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}
      >
        <NavBar
          title="Help Center"
          hideLeftIcon={false}
          leftButtonColor={colors.white_1}
          leftIconColor={colors.darkgray_1}
          border={false}
          bgColor={colors.white}
          titleColor={colors.darkgray_1}
          onRightPress={() => {}}
        />

        <View style={styles.searchContainer}>
          <CustomInput
            inputContainerStyle={styles.input}
            inputStyle={{ paddingVertical: 0 }}
            leftSvgIcon={<SearchIcon />}
            placeholder="Search for help..."
            placeholderTextColor={colors.gray_2}
          />
        </View>
        <ScrollView contentContainerStyle={styles.body}>
          <AnimatedWrapper>
          <Text style={styles.heading}>Quick Actions</Text>

          <View style={styles.quickActionRow}>
            <QuickAction
              title="Contact Support"
              description="Get help from our team"
              icon={
                <HeadPhoneIcon
                  width={correctSize(20)}
                  height={correctSize(20)}
                  color={colors.white}
                />
              }
              borderColor={colors.darkgray_1}
              containerBg={colors.darkgray_1}
              iconBg={colors.white_6}
              titleColor={colors.white}
              descriptionColor={colors.white}
            />
            <QuickAction
              title="Report Brand"
              description="Report an issue"
              icon={<FlagIcon />}
              borderColor={colors.gray}
              containerBg={colors.white}
              iconBg={colors.light_red}
              titleColor={colors.darkgray_1}
              descriptionColor={colors.gray_4}
            />
          </View>
 
          <Text style={styles.heading}>Popular Topics</Text>

          {popularTopicsList.map(item => (
            <ActionCard
              title={item.title}
              description={item.description}
              icon={item.icon}
              iconBg={item.iconBg}
              key={item.id}
            />
          ))}

        <Text style={[styles.heading,styles.heading2]}>Frequently Asked</Text>
          <CustomAccordion
          data={SECTIONS} 
          />

          <Text style={[styles.heading,styles.heading2]}>Resources</Text>

          {
            helpResourcesList.map((item)=>(
              <ResourceCard
              title={item.title}
              icon={item.icon}
              key={item.id}
              />
            ))
          }
          
          <HelpCard/>
       </AnimatedWrapper>
        </ScrollView>
      </LinearGradient>
    </ScreenWrapper>
  );
};

export default HelpCenter;
const styles = StyleSheet.create({
  body: {
    padding: correctSize(24),
  },
  searchContainer: {
    padding: correctSize(24),
    backgroundColor: colors.white,
  },
  input: {
    borderWidth: correctSize(2),
    borderColor: colors.gray,
    backgroundColor: colors.lightBlue_5,
    borderRadius: 12,
  },
  quickActionRow: {
    flexDirection: 'row',
    gap: correctSize(12),
    marginBottom: correctSize(32),
  },
  heading: {
    fontSize: 14,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.gray_4,
    marginBottom: correctSize(16),
  },
  heading2:{
    fontFamily:Fonts.InriaSerif_Bold,
    marginTop:correctSize(20)
  }
});
