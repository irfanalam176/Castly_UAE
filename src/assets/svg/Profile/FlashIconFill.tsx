import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const FlashIconFill = (props: SvgProps) => (
  <Svg
    width={props.width || 11}
    height={ props.height || 12}
    viewBox="0 0 11 12"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M1.699 6.846a.425.425 0 0 1-.331-.692L5.573 1.82a.212.212 0 0 1 .365.196l-.815 2.557a.425.425 0 0 0 .399.573h2.973a.425.425 0 0 1 .332.693L4.62 10.172a.213.213 0 0 1-.365-.195l.816-2.557a.425.425 0 0 0-.4-.574H1.7Z"
        fill={props.color || "#CA8A04"}
        stroke={props.color || "#CA8A04"}
        strokeWidth={0.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h10.195v11.994H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default FlashIconFill
