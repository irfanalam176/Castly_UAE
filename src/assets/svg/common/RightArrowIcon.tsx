import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const RightArrowIcon = (props: SvgProps) => (
  <Svg
    width={ props.width|| 6}
    height={ props.height|| 11}
    viewBox="0 0 6 11"
    fill="none"
    {...props}
  >
    <Path
      d="m.75 9.746 4.498-4.498L.75.75"
      stroke={props.color||"#F7FF36"}
      strokeWidth={1.499}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default RightArrowIcon
