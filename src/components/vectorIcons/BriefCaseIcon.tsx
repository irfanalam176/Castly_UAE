import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { SvgIconProps } from "./type"

const BriefCaseIcon: React.FC<SvgIconProps> = ({
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
      <G clipPath="url(#clip0_20_8276)">
        <Path
          d="M7.188 1.875h5.625c.171 0 .312.14.312.313V3.75h-6.25V2.187c0-.171.14-.312.313-.312zM5 2.188V3.75H2.5A2.502 2.502 0 000 6.25V10h20V6.25c0-1.379-1.121-2.5-2.5-2.5H15V2.187C15 .98 14.02 0 12.812 0H7.189C5.98 0 5 .98 5 2.188zm15 9.062h-7.5v1.25c0 .691-.559 1.25-1.25 1.25h-2.5c-.691 0-1.25-.559-1.25-1.25v-1.25H0v5c0 1.379 1.121 2.5 2.5 2.5h15c1.379 0 2.5-1.121 2.5-2.5v-5z"
          fill={fillColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_20_8276">
          <Path d="M0 0h20v20H0V0z" fill={fillColor} />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default BriefCaseIcon
