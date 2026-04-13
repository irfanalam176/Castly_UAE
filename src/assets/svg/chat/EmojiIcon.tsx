import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const EmojiIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 18}
    height={ props.height || 18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#374151"}
      strokeWidth={1.499}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M8.992 16.485a7.493 7.493 0 1 0 0-14.987 7.493 7.493 0 0 0 0 14.987Z" />
      <Path d="M5.995 10.49s1.124 1.5 2.997 1.5c1.873 0 2.997-1.5 2.997-1.5M6.744 6.744h.007M11.24 6.744h.007" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h17.984v17.984H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default EmojiIcon
