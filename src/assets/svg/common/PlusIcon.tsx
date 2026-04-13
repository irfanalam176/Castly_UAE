import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const PlusIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 16}
    height={ props.height || 18}
    viewBox="0 0 16 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M9 2.813a1.124 1.124 0 1 0-2.25 0v5.062H1.687a1.124 1.124 0 1 0 0 2.25H6.75v5.063a1.124 1.124 0 1 0 2.25 0v-5.063h5.063a1.124 1.124 0 1 0 0-2.25H9V2.812Z"
        fill={props.color||"#374151"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h15.75v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default PlusIcon
