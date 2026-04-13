import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ShineIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 16}
    height={ props.height || 16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#D97706"}
      strokeWidth={1.333}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6.624 10.332a1.333 1.333 0 0 0-.958-.958L1.576 8.32a.333.333 0 0 1 0-.642l4.09-1.055a1.333 1.333 0 0 0 .958-.957l1.054-4.09a.333.333 0 0 1 .642 0l1.054 4.09a1.333 1.333 0 0 0 .958.958l4.09 1.054a.334.334 0 0 1 0 .642l-4.09 1.054a1.333 1.333 0 0 0-.958.958l-1.054 4.09a.334.334 0 0 1-.642 0l-1.054-4.09ZM13.332 2v2.666M14.665 3.333h-2.666M2.666 11.332v1.333M3.333 11.998H2" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h15.998v15.998H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ShineIcon
