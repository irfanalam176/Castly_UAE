import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ArrowUp = (props: SvgProps) => (
  <Svg
    width={ props.width??9}
    height={ props.height??  11}
    viewBox="0 0 9 11"
    fill="none"
    {...props}
  >
    <Path
      d="M5.03.22a.751.751 0 0 0-1.062 0L.218 3.97A.751.751 0 0 0 1.279 5.03L3.75 2.56v7.19a.75.75 0 1 0 1.5 0V2.56l2.471 2.47a.751.751 0 0 0 1.062-1.062L5.032.217 5.029.22Z"
      fill={props.color??"#F7FF36"}
    />
  </Svg>
)

export default ArrowUp
