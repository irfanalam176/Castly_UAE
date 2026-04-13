import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ChevronDownIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 11}
    height={ props.height || 11}
    viewBox="0 0 11 11"
    fill="none"
    {...props}
  >
    <Path
      d="M2.748 4.121 5.495 6.87 8.242 4.12"
      stroke={props.color || "#4338CA"}
      strokeWidth={0.916}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ChevronDownIcon
