import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ChevronRight = (props: SvgProps) => (
  <Svg
    width={ props.width || 14}
    height={ props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path
      d="m5.249 10.498 3.5-3.5-3.5-3.499"
      stroke={props.color || "#9CA3AF"}
      strokeWidth={1.166}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ChevronRight
