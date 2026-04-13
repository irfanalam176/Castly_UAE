import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const InstagramIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 11}
    height={ props.height || 11}
    viewBox="0 0 11 11"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#6B7280"}
      strokeWidth={0.916}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M7.785.916h-4.58a2.29 2.29 0 0 0-2.29 2.29v4.578a2.29 2.29 0 0 0 2.29 2.29h4.58a2.29 2.29 0 0 0 2.29-2.29V3.205a2.29 2.29 0 0 0-2.29-2.29Z" />
      <Path d="M7.327 5.207a1.832 1.832 0 1 1-3.624.537 1.832 1.832 0 0 1 3.624-.537ZM8.013 2.976h.005" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h10.99v10.99H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default InstagramIcon
