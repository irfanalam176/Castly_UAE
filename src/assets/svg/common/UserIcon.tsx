import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const UserIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 14}
    height={ props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path
      d="M11.081 12.247v-1.166a2.333 2.333 0 0 0-2.333-2.333h-3.5a2.333 2.333 0 0 0-2.332 2.333v1.166M6.998 6.415a2.333 2.333 0 1 0 0-4.665 2.333 2.333 0 0 0 0 4.665Z"
      stroke={props.color || "#4338CA"}
      strokeWidth={1.166}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default UserIcon
