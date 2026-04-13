import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const StartIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 13}
    height={ props.height || 13}
    viewBox="0 0 13 13"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M6.238 1.242a.287.287 0 0 1 .515 0l1.25 2.533a1.15 1.15 0 0 0 .863.628l2.797.41a.287.287 0 0 1 .159.489L9.8 7.27a1.15 1.15 0 0 0-.331 1.016l.477 2.783a.287.287 0 0 1-.417.303l-2.5-1.315a1.149 1.149 0 0 0-1.068 0l-2.499 1.315a.287.287 0 0 1-.417-.303l.477-2.782a1.149 1.149 0 0 0-.33-1.017L1.168 5.302a.287.287 0 0 1 .16-.49l2.795-.409a1.149 1.149 0 0 0 .865-.628l1.25-2.533Z"
        fill={props.color||"#E5E7EB"}
        stroke={props.color || "#E5E7EB"}
        strokeWidth={1.083}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12.991v12.991H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default StartIcon
