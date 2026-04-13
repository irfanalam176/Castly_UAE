import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const BankIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 20}
    height={ props.height || 20}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#6B7280"}
      strokeWidth={1.666}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4.998 18.326V3.332a1.666 1.666 0 0 1 1.666-1.666h6.664a1.666 1.666 0 0 1 1.666 1.666v14.994H4.998ZM4.998 9.996H3.332a1.666 1.666 0 0 0-1.666 1.666v4.998a1.666 1.666 0 0 0 1.666 1.666h1.666M14.994 7.497h1.666a1.666 1.666 0 0 1 1.666 1.666v7.497a1.666 1.666 0 0 1-1.666 1.666h-1.666M8.33 4.998h3.332M8.33 8.33h3.332M8.33 11.662h3.332M8.33 14.994h3.332" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h19.992v19.992H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default BankIcon
