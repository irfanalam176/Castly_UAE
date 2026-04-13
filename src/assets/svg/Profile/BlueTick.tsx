import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const BlueTick = (props: SvgProps) => (
  <Svg
    width={ props.width || 18}
    height={ props.height || 18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M9 16.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
        fill={props.color || "#2563EB"}
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="m6.75 9 1.5 1.5 3-3" fill={props.color || "#2563EB"} />
      <Path
        d="m6.75 9 1.5 1.5 3-3"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h17.999v17.999H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default BlueTick
