import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CheveronDown = (props: SvgProps) => (
  <Svg
    width={props.width??11}
    height={ props.height?? 6}
    viewBox="0 0 11 6"
    fill="none"
   
    {...props}
  >
    <Path
      d="M4.722 5.781a.751.751 0 0 0 1.062 0l4.5-4.5A.751.751 0 0 0 9.222.22l-3.97 3.97L1.282.222A.751.751 0 0 0 .22 1.284l4.5 4.5.002-.003Z"
      fill={props.color??"#4F46E5"}
    />
  </Svg>
)

export default CheveronDown
