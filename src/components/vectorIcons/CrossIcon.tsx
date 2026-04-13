import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { SvgIconProps } from "./type";

const CrossIcon: React.FC<SvgIconProps> = ({
  width = 13,
  height = 13,
  fillColor = "#FFFFFF",
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 13 13"
      {...props}
    >
      <Path
        d="M12.136 2.136a1.252 1.252 0 00-1.77-1.77L6.253 4.483 2.136.37a1.252 1.252 0 00-1.77 1.77l4.117 4.113L.37 10.37a1.252 1.252 0 001.77 1.77l4.113-4.118 4.117 4.114a1.252 1.252 0 001.77-1.77L8.022 6.253l4.114-4.117z"
        fill={fillColor}   // ✅ dynamic color
      />
    </Svg>
  );
};

export default CrossIcon;
