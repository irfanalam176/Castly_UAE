import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ShieldIcon = (props: SvgProps) => (
  <Svg
    width={ props.width|| 14}
    height={ props.height || 17}
    viewBox="0 0 14 17"
    fill="none"
    {...props}
  >
    <Path
      d="M12.75 9c0 3.75-2.625 5.625-5.745 6.712a.75.75 0 0 1-.503-.007C3.375 14.625.75 12.75.75 9V3.75A.75.75 0 0 1 1.5 3C3 3 4.875 2.1 6.18.96a.877.877 0 0 1 1.14 0C8.632 2.108 10.5 3 12 3a.75.75 0 0 1 .75.75V9Z"
      stroke={props.color||"#2563EB"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ShieldIcon
