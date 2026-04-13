import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SaveIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 13}
    height={ props.height || 13}
    viewBox="0 0 13 13"
    fill="none"
    {...props}
  >
    <Path
      d="M8.228 1.624c.285.004.558.12.758.325l2.056 2.056c.204.2.321.473.325.758v5.521a1.083 1.083 0 0 1-1.082 1.083H2.707a1.083 1.083 0 0 1-1.083-1.083V2.706a1.083 1.083 0 0 1 1.083-1.082h5.52Z"
      stroke={props.color || "#F7FF36"}
      strokeWidth={1.083}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.202 11.367V7.578a.541.541 0 0 0-.541-.541H4.33a.541.541 0 0 0-.542.541v3.79M3.79 1.624v2.165a.541.541 0 0 0 .54.541h3.79"
      stroke={props.color || "#F7FF36"}
      strokeWidth={1.083}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SaveIcon
