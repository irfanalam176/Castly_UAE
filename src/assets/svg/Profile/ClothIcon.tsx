import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ClothIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 16}
    height={ props.height || 16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="m13.585 2.306-2.92-.973a2.666 2.666 0 1 1-5.332 0l-2.92.973a1.333 1.333 0 0 0-.893 1.487l.386 2.313a.667.667 0 0 0 .66.56H4v6.666c0 .733.6 1.333 1.334 1.333h5.332A1.333 1.333 0 0 0 12 13.332V6.666h1.433a.666.666 0 0 0 .66-.56l.386-2.313a1.333 1.333 0 0 0-.893-1.487Z"
        stroke={props.color || "#7C3AED"}
        strokeWidth={1.333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h15.998v15.998H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ClothIcon
