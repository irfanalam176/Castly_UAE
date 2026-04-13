import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const EditIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 11}
    height={ props.height || 11}
    viewBox="0 0 11 11"
    fill="none"
    {...props}
  >
    <Path
      d="M5.495 9.158h4.121M7.499 1.658a.972.972 0 0 1 1.374 1.375l-5.5 5.5a.916.916 0 0 1-.39.232l-1.316.384a.229.229 0 0 1-.284-.284l.384-1.315A.916.916 0 0 1 2 7.158l5.5-5.5Z"
      stroke={props.color || "#fff"}
      strokeWidth={0.916}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default EditIcon
