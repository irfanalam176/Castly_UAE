import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
import Icons from '../vectorIcons/Icons';
import { Fonts } from '../../assets/fonts';
import CustomButton from './CustomButton';

const HighLightCard = ({
  title,
  description,
  titleSize,
  descriptionSize,
  subDescription,
  footer = false,
  icon,
  iconSize,
  iconFamily,
  iconColor,
  iconBg,
  bgColor,
  border = false,
  borderColor,
  status,
  statusColor,

  footerBtn = true,
  verified = false,
  footerLable,
  footerBtnColor,
  footerBtnText,
  footerLableColor,
  footerBtnTextColor,
  footerBtnBorderColor,
  outerChildren = true,

  children,
}: any) => {
  return (
    <View
      style={[
        styles.highlightCard,
        {
          backgroundColor: bgColor || colors.green_3,
          borderColor: borderColor || colors.green_4,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: iconBg || colors.darkGreen3, elevation: 0 },
          ]}
        >
          <Icons
            name={icon || 'help'}
            size={iconSize || 20}
            family={iconFamily || 'FontAwesome6'}
            color={iconColor || colors.white}
          />
        </View>
        <View>
          <Text style={[styles.titleText, { fontSize: titleSize || 14 }]}>
            {title}
          </Text>
          <View style={styles.descriptionContainer}>
            <Text
              style={[
                styles.descriptionText,
                { fontSize: descriptionSize || 12 },
              ]}
            >
              {description}
            </Text>
          </View>

          <Text style={styles.subDescriptionText}>{subDescription}</Text>

          {!outerChildren && children}

          {footer && (
            <View style={styles.footer}>
              <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <Text
                  style={[
                    styles.footerLabel,
                    { color: footerLableColor || colors.gray_3 },
                  ]}
                >
                  {footerLable}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                {footerBtn && (
                  <CustomButton
                    title={footerBtnText}
                    style={[
                      styles.button,
                      {
                        backgroundColor: footerBtnColor || colors.white,
                        borderColor: footerBtnBorderColor || colors.gray,
                        borderWidth: footerBtnColor ? 0 : 1,
                      },
                    ]}
                    textStyle={[
                      styles.buttonText,
                      { color: footerBtnTextColor || colors.black },
                    ]}
                  />
                )}

                {verified && (
                  <View style={styles.row}>
                    <Icons
                      name={'circle'}
                      color={colors.darkGreen3}
                      size={8}
                      family={'FontAwesome6'}
                      style={styles.status}
                    />

                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        {status && (
          <Icons
            name={'circle'}
            family={'FontAwesome6'}
            size={8}
            color={statusColor}
          />
        )}
      </View>

      {outerChildren && children}
    </View>
  );
};

export default HighLightCard;

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
  },
  highlightCard: {
    borderRadius: 12,
    padding: correctSize(17),
    borderWidth: 1,
    marginBottom: correctSize(12),
  },
  iconContainer: {
    width: correctSize(44), // Slightly smaller than nav button
    height: correctSize(44),
    borderRadius: 12, // Squircle
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 2,
    marginRight: correctSize(12),
  },
  titleText: {
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  descriptionContainer: {
    width: '80%',
    marginTop: correctSize(4),
    marginBottom: correctSize(8),
  },
  descriptionText: {
    color: colors.gray_1,
  },
  subDescriptionText: {
    fontSize: 12,
    color: colors.gray_4,
  },
  footer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLabel: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  status: {
    marginRight: correctSize(5),
  },
  verifiedText: {
    color: colors.green,
    fontFamily: Fonts.Inter_Medium,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // in case icon is added in future
  },
  buttonText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_SemiBold,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});
