import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const BadgeIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 15}
    height={ props.height || 15}
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <Path
      d="m9.668 8.052.946 5.326a.312.312 0 0 1-.506.294l-2.236-1.679a.624.624 0 0 0-.748 0l-2.24 1.678a.312.312 0 0 1-.506-.293l.946-5.326"
      stroke={props.color || "#374151"}
      strokeWidth={1.249}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.496 8.745a3.748 3.748 0 1 0 0-7.496 3.748 3.748 0 0 0 0 7.496Z"
      stroke={props.color || "#374151"}
      strokeWidth={1.249}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default BadgeIcon
