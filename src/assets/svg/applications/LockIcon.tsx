import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const LockIcon = (props: SvgProps) => (
  <Svg
    width={props.width??11}
    height={props.height??12}
    viewBox="0 0 11 12"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M3.375 3.375V4.5h3.75V3.375a1.874 1.874 0 1 0-3.75 0ZM1.875 4.5V3.375a3.376 3.376 0 0 1 6.75 0V4.5H9c.827 0 1.5.673 1.5 1.5v4.5c0 .827-.673 1.5-1.5 1.5H1.5C.673 12 0 11.327 0 10.5V6c0-.827.673-1.5 1.5-1.5h.375Z"
        fill={props.color??"#4B5563"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h10.5v12H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default LockIcon
