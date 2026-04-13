import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const LeftArrowIcon = (props: SvgProps) => (
  <Svg
    width={ props.width|| 18}
    height={ props.height|| 18}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <Path
      d="M8.997 14.245 3.749 8.997l5.248-5.248M14.245 8.997H3.749"
      stroke={ props.stroke|| "#fff"}
      strokeWidth={1.499}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default LeftArrowIcon
