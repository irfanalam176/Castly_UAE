import { StyleSheet, View, Text, FlatList } from 'react-native';
import React from 'react';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { SVG } from '../../assets/svg';
import Icons from '../vectorIcons/Icons';
import LinearGradient from 'react-native-linear-gradient';

import { DimensionValue } from 'react-native';
import { correctSize } from '../../utils';

export interface InfoBannerProps {
  /* Icon container */
  iconPadding?: number;
  iconHeight?: DimensionValue;
  iconWidth?: DimensionValue;
  iconBg?: string;
  iconColor?: string;
  icon?: string;
  svgIcon?: React.ReactNode;

  /* Container */
  containerPadding?: number;
  containerbgColor?: string;
  containerborderColor?: string;
  containerMarginBottom?: number;
  containerMarginTop?: number;

  /* Content */
  showIcon?: boolean;
  heading?: string;
  description?: string;

  /* Heading text */
  headingFamily?: string;
  headingSize?: number;
  headingColor?: string;

  /* Description text */
  descriptionFamily?: string;
  descriptionSize?: number;
  descriptionColor?: string;

  withIcon?: boolean;

  /* Gradient */
  gradient?: boolean;
  gradientColor?: string[];

  showPoints?: boolean;
  points?: Array<any>
}

export default function InfoBanner({
  iconPadding,
  iconHeight,
  iconWidth,
  containerPadding,
  containerbgColor,
  containerborderColor,
  containerMarginBottom,
  containerMarginTop,
  showIcon,
  heading,
  headingFamily,
  headingSize,
  headingColor,
  description,
  descriptionFamily,
  descriptionSize,
  descriptionColor,
  gradient,
  gradientColor,
  icon,
  iconBg,
  iconColor,
  svgIcon,
  withIcon = true,
  showPoints = false,
  points
}: InfoBannerProps) {
  const Wrapper: any = gradient ? LinearGradient : View;

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={styles.item}>
        <Icons name="check" family="Feather" size={20} color={colors.gray_1} />
        <Text style={styles.pointText}>
          {item.label}
        </Text>
      </View>
    )
  }
  return (
    <Wrapper
      {...(gradient && {
        colors: gradientColor
          ? gradientColor
          : [colors.lightBlue_2, colors.lightBlue_4],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 1 },
      })}
      style={[
        styles.container,
        {
          padding: correctSize(containerPadding || 18),
          backgroundColor: containerbgColor,
          borderColor: containerborderColor,
          marginBottom: containerMarginBottom || 0,
          marginTop: containerMarginTop || 0,
        },
      ]}
    >
      <View
        style={[
          styles.leftSideContainer,
          {
            padding: correctSize(iconPadding || 0),
            height: iconHeight || 40,
            width: iconWidth || 40,
            backgroundColor: iconBg ? iconBg : colors.gray_1,
            marginRight: iconBg != "transparent" ? correctSize(12) : 5
          },
        ]}
      >
        {showIcon ? (
          svgIcon
        ) : (
          <Icons
            family={'FontAwesome6'}
            name={icon ? icon : 'lightbulb'}
            color={iconColor ? iconColor : colors.white}
            size={20}
          />
        )}
      </View>
      <View style={styles.rightSideContainer}>
        {heading && (
          <Text
            style={[
              styles.headingText,
              {
                fontSize: headingSize || 14,
                color: headingColor || colors.darkgray_1,
                fontFamily: headingFamily || Fonts.InriaSerif_Bold,
              },
            ]}
          >
            {heading}
          </Text>
        )}
        {description &&
          <Text
            style={[
              styles.descriptionText,
              {
                fontSize: descriptionSize || 12,
                color: descriptionColor || colors.gray_1,
                fontFamily: descriptionFamily || Fonts.InriaSerif_Bold,
              },
            ]}
          >
            {description}
          </Text>
        }
        {points &&
          <FlatList
            data={points}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            renderItem={renderItem}
            // style={styles.flatListStyle}
          // columnWrapperStyle={styles.flatListContent}
          />
        }
      </View>
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
  },
  leftSideContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  rightSideContainer: {
    flex: 1,
  },
  headingText: {
    marginBottom: correctSize(4),
  },
  descriptionText: {
    lineHeight: 20,
    // Base styles - dynamic styles applied inline
  },
  item:{
    flexDirection:'row',
    flex:1,
    alignItems:"flex-start",
  },
  pointText:{
     color: colors.gray_1,
     fontSize: 14,
     marginLeft: 8,
     marginBottom:6,
     lineHeight:20,
     flexShrink:1
  }
});
