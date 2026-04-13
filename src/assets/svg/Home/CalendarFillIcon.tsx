import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

function CalendarFillIcon(props:SvgProps) {
  return (
    <Svg
      width={ props.width??13}
      height={ props.height??14}
      viewBox="0 0 13 14"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1_4020)">
        <Path
          d="M2.625.875v.875H1.312C.589 1.75 0 2.338 0 3.063v1.312h12.25V3.062c0-.724-.588-1.312-1.313-1.312H9.626V.875a.874.874 0 10-1.75 0v.875h-3.5V.875a.874.874 0 10-1.75 0zM12.25 5.25H0v7.438C0 13.412.588 14 1.313 14h9.624c.725 0 1.313-.588 1.313-1.313V5.25z"
          fill={props.color??"#4B5563"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_4020">
          <Path d="M0 0h12.25v14H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CalendarFillIcon
