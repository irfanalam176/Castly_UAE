import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { SvgIconProps } from "./type"

const WalletIcon: React.FC<SvgIconProps> = ({
  width = 24,
  height = 24,
  fillColor = "#A8AEB9",
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_624_2011)">
        <Path
          d="M2.5 1.25A2.502 2.502 0 000 3.75v12.5c0 1.379 1.121 2.5 2.5 2.5h15c1.379 0 2.5-1.121 2.5-2.5V7.5C20 6.121 18.879 5 17.5 5H3.125a.627.627 0 01-.625-.625c0-.344.281-.625.625-.625H17.5c.691 0 1.25-.559 1.25-1.25s-.559-1.25-1.25-1.25h-15zm13.75 9.375a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"
          fill={fillColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_624_2011">
          <Path d="M0 0h20v20H0V0z" fill={fillColor} />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default WalletIcon
