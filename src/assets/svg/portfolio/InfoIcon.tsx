import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const InfoIcon = (props: SvgProps) => (
  <Svg
    width={ props.width?? 6}
    height={ props.height?? 14}
    viewBox="0 0 6 14"
    fill="none"
    {...props}
  >
    <Path
      d="M1.313 1.313a1.313 1.313 0 1 1 2.625 0 1.313 1.313 0 0 1-2.626 0ZM0 5.25c0-.484.391-.875.875-.875h1.75c.484 0 .875.391.875.875v6.125h.875a.874.874 0 1 1 0 1.75h-3.5a.874.874 0 1 1 0-1.75h.875v-5.25H.875A.874.874 0 0 1 0 5.25Z"
      fill={props.color??"#fff"}
    />
  </Svg>
)

export default InfoIcon
