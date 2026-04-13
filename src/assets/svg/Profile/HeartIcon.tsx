import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const HeartIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 12}
    height={ props.height || 11}
    viewBox="0 0 12 11"
    fill="none"
    {...props}
  >
    <Path
      d="M9.747 6.498c.807-.79 1.625-1.738 1.625-2.978A2.978 2.978 0 0 0 8.393.542c-.953 0-1.624.27-2.436 1.083C5.144.812 4.473.542 3.52.542A2.978 2.978 0 0 0 .542 3.52c0 1.245.812 2.193 1.624 2.978l3.79 3.79 3.791-3.79Z"
      fill={props.color || "#F43F5E"}
      stroke={props.color || "#F43F5E"}
      strokeWidth={1.083}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default HeartIcon
