import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const CheckIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color ?? "#34D399"}
      strokeWidth={0.999}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M5.994 10.99a4.995 4.995 0 1 0 0-9.99 4.995 4.995 0 0 0 0 9.99Z" />
      <Path d="m4.496 5.994.999 1 1.998-1.999" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h11.989v11.989H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default CheckIcon
