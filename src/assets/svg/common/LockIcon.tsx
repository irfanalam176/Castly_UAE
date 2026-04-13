import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const LockIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 14}
    height={ props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#374151"}
      strokeWidth={1.165}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M11.072 6.41H2.914c-.644 0-1.166.522-1.166 1.165v4.08c0 .643.522 1.165 1.166 1.165h8.158c.643 0 1.165-.522 1.165-1.165v-4.08c0-.643-.522-1.165-1.165-1.165ZM4.08 6.41V4.08a2.914 2.914 0 1 1 5.826 0v2.33" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13.986v13.986H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default LockIcon
