import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ClockIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 11}
    height={ props.height || 11}
    viewBox="0 0 11 11"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#EF4444"}
      strokeWidth={0.916}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M5.495 10.075a4.58 4.58 0 1 0 0-9.159 4.58 4.58 0 0 0 0 9.159Z" />
      <Path d="M5.495 2.748v2.747l1.832.916" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h10.991v10.991H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ClockIcon
