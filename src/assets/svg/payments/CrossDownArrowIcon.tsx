import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CrossDownArrowIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 18}
    height={ props.height || 18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      d="m12.745 5.248-7.497 7.497M12.745 12.745H5.248V5.248"
      stroke={props.color || "#15803D"}
      strokeWidth={1.499}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CrossDownArrowIcon
