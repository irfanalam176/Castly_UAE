import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const HikeArrowIcon = (props: SvgProps) => (
  <Svg
    width={ props.width|| 11}
    height={ props.height || 11}
    viewBox="0 0 11 11"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color||"#F7FF36"}
      strokeWidth={0.916}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M10.074 3.205 6.182 7.098l-2.29-2.29L.916 7.784" />
      <Path d="M7.327 3.205h2.747v2.748" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h10.99v10.99H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default HikeArrowIcon
