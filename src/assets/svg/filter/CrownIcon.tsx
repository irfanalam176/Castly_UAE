import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CrownIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 14}
    height={11}
    viewBox="0 0 14 11"
    fill="none"
    {...props}
  >
    <Path
      d="M7.242 1.734A.936.936 0 0 0 6.75 0a.937.937 0 0 0-.492 1.734L4.915 4.42a.75.75 0 0 1-1.14.251L1.689 3a.938.938 0 1 0-.75.375h.016l1.071 5.892A1.5 1.5 0 0 0 3.502 10.5h6.496c.725 0 1.346-.518 1.477-1.233l1.071-5.892h.017a.937.937 0 1 0-.75-.375L9.723 4.671a.75.75 0 0 1-1.139-.25L7.242 1.733Z"
      fill={props.color || "#2563EB"}
    />
  </Svg>
)

export default CrownIcon
