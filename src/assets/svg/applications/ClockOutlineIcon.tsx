import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ClockOutlineIcon = (props: SvgProps) => (
  <Svg
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke="#9CA3AF"
      strokeWidth={1.006}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6.033 11.522a5.028 5.028 0 1 0 0-10.055 5.028 5.028 0 0 0 0 10.055Z" />
      <Path d="M6.033 3.478v3.017L8.045 7.5" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12.067v12.989H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ClockOutlineIcon
