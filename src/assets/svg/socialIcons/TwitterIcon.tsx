import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { colors } from "../../../utils/colors"

const TwitterIcon = (props: SvgProps) => (
  <Svg
       width={ props.width || 14}
    height={ props.height || 14}
    viewBox=" 0 0 14 14"
    fill={ props.color || colors.white}
    {...props}
  >
    <Path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
  </Svg>
)

export default TwitterIcon
