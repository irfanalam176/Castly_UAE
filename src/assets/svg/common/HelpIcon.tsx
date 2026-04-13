import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const HelpIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 14}
    height={ props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#374151"}
      strokeWidth={1.165}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6.993 12.82a5.827 5.827 0 1 0 0-11.654 5.827 5.827 0 0 0 0 11.654Z" />
      <Path d="M5.297 5.245a1.748 1.748 0 0 1 3.397.582c0 1.166-1.748 1.749-1.748 1.749M6.993 9.906h.005" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13.986v13.986H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default HelpIcon
