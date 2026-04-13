import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const MoneyIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 14}
    height={ props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#F7FF36"}
      strokeWidth={1.165}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6.993 12.82a5.827 5.827 0 1 0 0-11.654 5.827 5.827 0 0 0 0 11.654Z" />
      <Path d="M9.323 4.662H5.827a1.165 1.165 0 1 0 0 2.33h2.331a1.165 1.165 0 1 1 0 2.331H4.662M6.993 10.49V3.496" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13.986v13.986H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default MoneyIcon
