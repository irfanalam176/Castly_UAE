import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from 'react-native';
import Icons from '../vectorIcons/Icons';
import { colors } from '../../utils/colors';
import { Fonts } from '../../assets/fonts';
import { correctSize } from '../../utils';
import RightArrowIcon from '../../assets/svg/common/RightArrowIcon';

const DEBOUNCE_DELAY = 500; // ms — adjust as needed

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  icon?: React.ReactNode | { name: string; family: string; color?: string; size?: number };
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  disabled?: boolean;
  disabledTextColor?:string;
  debounceDelay?: number; // optional override
  arrow?:boolean
}

const CustomButton = ({
  onPress,
  title,
  icon,
  style,
  textStyle,
  loading,
  disabled,
  arrow,
  disabledTextColor,
  debounceDelay = DEBOUNCE_DELAY,
}: CustomButtonProps) => {
  const lastPressTime = useRef<number>(0);

  const handlePress = () => {
    const now = Date.now();
    if (now - lastPressTime.current < debounceDelay) return; // ignore rapid taps
    lastPressTime.current = now;
    
    onPress?.();
  };

  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) return <View style={{ marginRight: 8 }}>{icon}</View>;
    const { name, family, color, size } = icon as { name: string; family: string; color?: string; size?: number };
    return <Icons name={name} family={family} color={color} size={size} style={{ marginRight: 8 }} />;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={handlePress}
      disabled={disabled || !onPress}
      style={[
        styles.button,
        !style && styles.primaryButton,
        style,
        disabled && styles.disabledButton,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={colors.black} />
      ) : (
        <>
          {renderIcon()}
          <Text
            allowFontScaling={false}
            maxFontSizeMultiplier={1}
            style={[
              styles.text,
              !textStyle && styles.primaryText,
              textStyle,
              disabled && styles.disabledText,
              disabledTextColor&&{color:disabledTextColor}
            ]}
          >
            {title}
          </Text>
        </>
      )}

     {arrow&&<RightArrowIcon color={colors.darkgray_1} style={styles.arrowIcon}/>}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: correctSize(12),
    paddingHorizontal: correctSize(20),
    borderRadius: 12,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  disabledButton: {
    opacity:0.5
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  primaryText: {
    color: colors.black,
    fontFamily: Fonts.Inter_SemiBold,
  },
  disabledText: {
    color: colors.gray_2,
  },
  arrowIcon:{
    marginLeft:correctSize(10),
  }
});