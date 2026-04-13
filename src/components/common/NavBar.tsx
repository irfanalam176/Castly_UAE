import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../utils/colors';
import { font } from '../../utils/font';
import Icons from '../vectorIcons/Icons';
import { correctSize } from '../../utils';
import BackIcon from '../../assets/svg/Home/BackIcon';

interface NavBarProps {
  title: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showRightIcon?: boolean;
  titleColor?: string;
  rightIconName?: string;
  rightIconFamily?: string;
  rightIconColor?: string;
  rightButtonColor?: string;
  hideLeftIcon?: boolean;
  border?: boolean;
  svgIcon?:React.ReactNode;
  bgColor?:string;
  leftButtonColor?: string;
  leftIconColor?: string;
}

const NavBar = ({
  title,
  onLeftPress,
  onRightPress,
  showRightIcon = false,
  rightIconName = 'check',
  rightIconFamily = 'Feather',
  rightIconColor = colors.black,
  rightButtonColor = colors.primary,
  leftButtonColor = colors.white_1,
  leftIconColor = colors.gray_1,
  hideLeftIcon = false,
  border=true,
  svgIcon,
  bgColor,
  titleColor
}: NavBarProps) => {
  const navigation = useNavigation();

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.container, { borderBottomWidth: border?1:0, backgroundColor:bgColor??colors.white,}]}>
      {!hideLeftIcon ? (
        <TouchableOpacity style={[styles.iconButton,{ backgroundColor:leftButtonColor??colors.white_1}]} onPress={handleLeftPress}>
          <BackIcon color={leftIconColor}/>
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={[styles.title,{color:titleColor??colors.black}]} numberOfLines={1}>
        {title}
      </Text>

      {showRightIcon ? (
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: rightButtonColor }]}
          onPress={onRightPress}
          activeOpacity={0.7}
        >
        {svgIcon??<Icons
            family={rightIconFamily}
            name={rightIconName}
            size={24}
            color={rightIconColor}
          />}
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: correctSize(24),
    paddingVertical: correctSize(12),
   
   
    borderBottomColor: colors.gray,
  },
  title: {
    flex: 1,
    ...font(20, 700, 'InriaSerif'),
    textAlign: 'center',
    marginHorizontal: correctSize(16),
  },
  iconButton: {
    width: correctSize(48),
    height: correctSize(48),
    borderRadius: correctSize(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: correctSize(48),
    height: correctSize(48),
  },
});

export default NavBar;
