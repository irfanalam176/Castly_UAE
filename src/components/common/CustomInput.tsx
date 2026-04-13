import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import React, { useState } from 'react';
import { colors } from '../../utils/colors';
import Icons from '../vectorIcons/Icons';
import { Fonts } from '../../assets/fonts';
import { GlobalStyles } from '../../utils/globalStyles';
import { correctSize } from '../../utils';
import FastImage,{ImageStyle as FastImageStyle} from 'react-native-fast-image';

interface IconProps {
  family?: string;
  name?: string;
  color?: string;
  size?: number;
  style?: ViewStyle;
}

interface CustomInputProps {
  placeholder?: string;
  onChangeText?: (text: any) => void;
  value?: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  multiline?: boolean;
  readOnly?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  label?: string;
  errorMessage?: string;
  leftIcon?: IconProps;
  leftSvgIcon?: React.ReactNode;
  rightIcon?: IconProps;
  leftImageSource?: any;
  containerStyle?: ViewStyle;
  inputContainerStyle?: any;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  leftIconContainerStyle?: ViewStyle;
  rightIconContainerStyle?: ViewStyle;
  leftImageStyle?: FastImageStyle;
  placeholderTextColor?: string;
  editable?: boolean;
  leftText?: string;
  maxLength?:number
}

const CustomInput: React.FC<CustomInputProps> = ({
  leftSvgIcon,
  placeholder,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry = false,
  multiline,
  readOnly,
  autoCapitalize = 'none',
  label,
  errorMessage,
  leftIcon,
  rightIcon,
  leftImageSource,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  leftIconContainerStyle,
  rightIconContainerStyle,
  leftImageStyle,
  editable = true,
  placeholderTextColor = colors.black,
  leftText,
  maxLength,
  ...props
}) => {
  const [hidePass, setHidePass] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const renderRightIcon = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity
          style={[styles.eyeIcon, rightIconContainerStyle]}
          onPress={() => setHidePass(!hidePass)}
        >
          <Icons
            family="Ionicons"
            name={hidePass ? 'eye-off' : 'eye'}
            color={rightIcon?.color || colors.black}
            size={rightIcon?.size || 20}
          />
        </TouchableOpacity>
      );
    }

    if (rightIcon) {
      return (
        <View style={[styles.rightIconContainer, rightIconContainerStyle]}>
          <Icons
            family={rightIcon.family}
            name={rightIcon.name}
            color={rightIcon.color}
            size={rightIcon.size}
          />
        </View>
      );
    }

    return null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label.split('*')[0]}
          {label.includes('*') && <Text>*</Text>}
        </Text>
      )}

      <View style={[styles.inputContainer, inputContainerStyle, isFocused && styles.inputFocused]}>
        {leftSvgIcon && (
          <View style={[styles.leftIconContainer, leftIconContainerStyle]}>
            {leftSvgIcon}
            {leftText && <Text style={styles.leftText}>{leftText}</Text>}
          </View>
        )}

        {leftIcon && (
          <View style={[styles.leftIconContainer, leftIconContainerStyle]}>
            <Icons
              family={leftIcon.family}
              name={leftIcon.name}
              color={leftIcon.color}
              size={leftIcon.size}
            />
          </View>
        )}

        {leftImageSource && (
          <FastImage
            source={leftImageSource}
            style={[styles.leftIconImage, leftImageStyle]}
          />
        )}

        <TextInput
          style={[
            styles.textInput,
            leftIcon || leftImageSource ? styles.inputWithLeftIcon : {},
            rightIcon || secureTextEntry ? styles.inputWithRightIcon : {},
            inputStyle,
          ]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          secureTextEntry={hidePass}
          placeholderTextColor={placeholderTextColor}
          value={value}
          readOnly={readOnly}
          autoCapitalize={autoCapitalize}
          editable={editable}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {renderRightIcon()}
      </View>

      {errorMessage && (
        <Text style={[styles.errorText, errorStyle]}>{errorMessage}</Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  leftText: {
    fontSize: 18,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
  },
  label: {
    color: colors.black,
    fontSize: 13,
    fontFamily: Fonts.Inter_Regular,
    marginBottom: correctSize(5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: correctSize(10),
    paddingVertical: correctSize(12),
    borderColor: colors.gray,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 1,
  },
  leftIconContainer: {
    marginRight: correctSize(10),
  },
  rightIconContainer: {
    marginLeft: correctSize(10),
  },
  textInput: {
    flex: 1,
    color: colors.black,
    padding: 0,
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  inputWithLeftIcon: {
    marginLeft: correctSize(5),
  },
  inputWithRightIcon: {
    marginRight: correctSize(5),
  },
  eyeIcon: {
    // padding: correctSize(5),
  },
  leftIconImage: {
    height: 20,
    width: 20,
    marginRight: correctSize(10),
  },
  errorText: {
    fontSize: 10,
    fontFamily: Fonts.Inter_Bold,
    color: colors.red,
    marginTop: correctSize(2),
  },
}); 