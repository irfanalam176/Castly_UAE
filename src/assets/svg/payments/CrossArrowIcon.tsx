import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CrossArrowIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 14}
    height={ props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path
      d="M4.079 4.079h5.827v5.827M4.079 9.906l5.827-5.827"
      stroke={props.color || "#111827"}
      strokeWidth={1.165}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CrossArrowIcon
