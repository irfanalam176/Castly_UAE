import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ArrowDown = (props: SvgProps) => (
  <Svg
    width={ props.width?? 14}
    height={ props.height?? 16}
    viewBox="0 0 14 16"
    fill="none"
    {...props}
  >
    <Path
      d="M5.955 15.42c.44.439 1.153.439 1.593 0l5.625-5.625a1.127 1.127 0 0 0-1.593-1.593L7.875 11.91V1.125a1.124 1.124 0 1 0-2.25 0v10.782L1.919 8.205A1.127 1.127 0 0 0 .327 9.798l5.625 5.625.003-.004Z"
      fill={props.color??"#16A34A"}
    />
  </Svg>
)

export default ArrowDown
