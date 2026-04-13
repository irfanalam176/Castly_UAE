import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { SvgIconProps } from "./type"

const CalendarCheckIcon: React.FC<SvgIconProps> = ({
  width = 18,
  height = 20,
  fillColor = "#4B5563",
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
      <G clipPath="url(#clip0_1_5024)">
        <Path
          d="M5 0c.691 0 1.25.559 1.25 1.25V2.5h5V1.25c0-.691.559-1.25 1.25-1.25s1.25.559 1.25 1.25V2.5h1.875c1.035 0 1.875.84 1.875 1.875V6.25H0V4.375C0 3.34.84 2.5 1.875 2.5H3.75V1.25C3.75.559 4.309 0 5 0zM0 7.5h17.5v10.625c0 1.035-.84 1.875-1.875 1.875H1.875A1.875 1.875 0 010 18.125V7.5zm12.852 4.414a.937.937 0 00-1.324-1.324L7.815 14.3 5.98 12.466a.937.937 0 00-1.324 1.324l2.5 2.5a.934.934 0 001.324 0l4.372-4.375z"
          fill={fillColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_5024">
          <Path d="M0 0h17.5v20H0V0z" fill={fillColor} />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CalendarCheckIcon
