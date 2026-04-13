import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const CheckCircleIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 12}
    height={ props.height || 12}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#15803D"}
      strokeWidth={0.999}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M5.995 10.992a4.996 4.996 0 1 0 0-9.993 4.996 4.996 0 0 0 0 9.993Z" />
      <Path d="m4.497 5.995.999 1 1.998-1.999" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h11.991v11.991H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default CheckCircleIcon
