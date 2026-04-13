import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ChatIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 21}
    height={ props.height || 21}
    viewBox="0 0 21 21"
    fill="none"
    {...props}
  >
    <Path
      d="M6.91 17.492a7.87 7.87 0 1 0-3.412-3.41l-1.749 5.16 5.16-1.75Z"
      stroke={props.color || "#9CA3AF"}
      strokeWidth={1.749}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ChatIcon
