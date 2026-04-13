import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ShareIcon = (props: SvgProps) => (
  <Svg
    width={props.width??16}
    height={props.height??16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <Path d="M16 16H0V0h16v16Z" stroke="#E5E7EB" />
    <Path
      d="M9.594 1.087C9.234 1.247 9 1.607 9 2v2H5.5A5.5 5.5 0 0 0 0 9.5a6.128 6.128 0 0 0 3.131 5.44c.078.044.166.06.253.06.341 0 .616-.278.616-.616 0-.234-.134-.45-.306-.61C3.4 13.498 3 12.95 3 12a3 3 0 0 1 3-3h3v2c0 .394.231.753.594.912.362.16.781.094 1.075-.168l5-4.5c.21-.191.331-.46.331-.744a.995.995 0 0 0-.331-.744l-5-4.5a.992.992 0 0 0-1.075-.169Z"
      fill={props.color??"#4B5563"}
    />
  </Svg>
)

export default ShareIcon
