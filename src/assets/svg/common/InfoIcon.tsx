import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const InfoIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 13}
    height={ props.height || 13}
    viewBox="0 0 13 13"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#2563EB"}
      strokeWidth={1.083}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M6.495 11.908a5.413 5.413 0 1 0 0-10.825 5.413 5.413 0 0 0 0 10.825ZM6.496 4.33v2.166M6.496 8.66H6.5" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12.991v12.991H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default InfoIcon
