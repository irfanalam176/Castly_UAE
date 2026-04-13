import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const PhoneIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 14}
    height={ props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M12.82 9.86v1.747a1.165 1.165 0 0 1-1.27 1.166 11.53 11.53 0 0 1-5.03-1.79 11.362 11.362 0 0 1-3.496-3.495 11.532 11.532 0 0 1-1.789-5.052 1.165 1.165 0 0 1 1.16-1.27h1.748A1.165 1.165 0 0 1 5.31 2.167c.073.56.21 1.108.407 1.637a1.165 1.165 0 0 1-.262 1.23l-.74.74A9.323 9.323 0 0 0 8.21 9.27l.74-.74a1.165 1.165 0 0 1 1.23-.262 7.483 7.483 0 0 0 1.637.407A1.165 1.165 0 0 1 12.82 9.86Z"
        stroke={props.color || "#9CA3AF"}
        strokeWidth={1.165}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13.985v13.985H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default PhoneIcon
