import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SendArrowIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 15}
    height={ props.height || 15}
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <Path
      d="M9.079 13.544a.312.312 0 0 0 .585-.015l4.06-11.866a.31.31 0 0 0-.397-.397L1.46 5.326a.312.312 0 0 0-.015.585l4.953 1.986a1.25 1.25 0 0 1 .695.693l1.986 4.954ZM13.65 1.34 6.815 8.174"
      stroke={props.color || "#9CA3AF"}
      strokeWidth={1.249}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SendArrowIcon
