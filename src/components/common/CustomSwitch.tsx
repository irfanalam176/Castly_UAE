import React from 'react';
import { Switch } from 'react-native-switch';
import { colors } from '../../utils/colors';

type CustomSwitchProps = {
  value: boolean;
  onValueChange: (val: boolean) => void;
  activeColor?: string;
  inactiveColor?: string;
};

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value,
  onValueChange,
  activeColor = colors.darkgray_1,
  inactiveColor = colors.gray_5,
}) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      activeText=""
      inActiveText=""
      circleSize={20}
      barHeight={24}
      circleBorderWidth={1}
      circleBorderInactiveColor={inactiveColor}
      circleBorderActiveColor={activeColor}
      backgroundActive={activeColor}
      backgroundInactive={inactiveColor}
      circleActiveColor={colors.primary}
      circleInActiveColor={colors.white}
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={2}
      switchRightPx={2}
      switchWidthMultiplier={2.3}
    />
  );
};

export default CustomSwitch;