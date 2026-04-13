import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const HorizontalDots = (props: SvgProps) => (
  <Svg
    width={ props.width??14}
    height={ props.height??4}
    viewBox="0 0 14 4"
    fill="none"
    {...props}
  >
    <Path
      d="M0 1.75a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0Zm5 0a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0ZM11.75 0a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Z"
      fill={props.color??"#111827"}
    />
  </Svg>
)

export default HorizontalDots
