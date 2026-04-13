import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { SvgIconProps } from "./type"

const UserIcon: React.FC<SvgIconProps> = ({
  width = 24,
  height = 24,
  fillColor = "#9CA3AF",
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 20"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1_3411)">
        <Path
          d="M11.875 5a3.125 3.125 0 10-6.25 0 3.125 3.125 0 006.25 0zM3.75 5a5 5 0 1110 0 5 5 0 01-10 0zM1.926 18.125h13.648a5.091 5.091 0 00-5.039-4.375h-3.57a5.091 5.091 0 00-5.04 4.375zM0 18.84a6.963 6.963 0 016.965-6.965h3.57A6.963 6.963 0 0117.5 18.84c0 .64-.52 1.16-1.16 1.16H1.16C.52 20 0 19.48 0 18.84z"
          fill={fillColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_3411">
          <Path d="M0 0h17.5v20H0V0z" fill={fillColor} />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default UserIcon
