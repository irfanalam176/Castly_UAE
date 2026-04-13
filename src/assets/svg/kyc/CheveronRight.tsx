import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CheveronRight = (props: SvgProps) => (
  <Svg
    width={ props.width?? 7}
    height={ props.height?? 13}
    viewBox="0 0 7 13"
    fill="none"
    {...props}
  >
    <Path
      d="M6.745 5.51a.876.876 0 0 1 0 1.238l-5.25 5.25a.876.876 0 0 1-1.239-1.239l4.632-4.632L.26 1.495A.876.876 0 0 1 1.498.256l5.25 5.25-.003.003Z"
      fill={props.color??"#9CA3AF"}
    />
  </Svg>
)

export default CheveronRight
