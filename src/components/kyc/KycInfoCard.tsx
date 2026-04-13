import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';

interface KycInfoCardProps {
  icon?: React.ReactNode;
  title?: string;
  tag?: string;
  description?: string;
  gradient?: boolean;
  style?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  tagSyle?: TextStyle;
}

const KycInfoCard = ({
  icon,
  title,
  tag,
  iconContainerStyle,
  description,
  gradient,
  style,
  titleStyle,
  descriptionStyle,
  tagSyle,
}: KycInfoCardProps) => {
  // Conditional wrapper: gradient or normal View
  const Container: React.ElementType = gradient ? LinearGradient : View;
  const containerProps = gradient
    ? {
        colors: [colors.lightBlue_2, colors.lightBlue_4],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      }
    : {};

  return (
    <Container style={[styles.container, style]} {...containerProps}>
      <View style={[styles.iconContainer, iconContainerStyle]}>{icon}</View>

      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
          {tag && <Text style={[styles.tag, tagSyle]}>{tag}</Text>}
        </View>
        <Text style={[styles.description, descriptionStyle]}>
          {description}
        </Text>
      </View>
    </Container>
  );
};

export default KycInfoCard;

const styles = StyleSheet.create({
  container: {
    padding: correctSize(22),
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    marginBottom:correctSize(32)
  },
  iconContainer: {
    width: correctSize(48),
    height: correctSize(48),
    marginRight: correctSize(16),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.InriaSerif_Regular,
    marginBottom: correctSize(8),
    flexShrink: 1,
    color: colors.darkgray_1,
  },
  tag: {
    paddingVertical: correctSize(4),
    paddingHorizontal: correctSize(7),
    backgroundColor: colors.orange_3,
    borderRadius: 99,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: Fonts.Inter_Bold,
    fontSize: 12,
    color: colors.darkBrown,
    textTransform: 'uppercase',
  },
  description: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 14,
    lineHeight: 23,
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
