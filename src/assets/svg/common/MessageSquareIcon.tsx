import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MessageSquareIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 12}
    height={ props.height || 12}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <Path
      d="M11.073 7.576a1.165 1.165 0 0 1-1.166 1.166H2.914l-2.331 2.33V1.749A1.166 1.166 0 0 1 1.749.583h8.158a1.165 1.165 0 0 1 1.166 1.165v5.828Z"
      stroke={props.color || "#C2410C"}
      strokeWidth={1.166}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default MessageSquareIcon
