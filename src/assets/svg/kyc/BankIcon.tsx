import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const BankIcon = (props: SvgProps) => (
  <Svg
    width={ props.width ?? 18}
    height={ props.height ?? 18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      d="M8.557.09.682 3.465a1.12 1.12 0 0 0-.658 1.258c.11.52.566.9 1.1.9v.281c0 .468.377.844.844.844h14.063a.842.842 0 0 0 .844-.844v-.28a1.125 1.125 0 0 0 .443-2.159L9.443.09a1.14 1.14 0 0 0-.886 0ZM4.5 7.873H2.25v6.901a.615.615 0 0 0-.064.04L.5 15.937A1.126 1.126 0 0 0 .045 17.2c.145.475.584.798 1.08.798h15.75a1.123 1.123 0 0 0 .622-2.06l-1.688-1.125c-.02-.014-.042-.024-.063-.039v-6.9H13.5v6.75h-1.407v-6.75h-2.25v6.75H8.156v-6.75h-2.25v6.75H4.5v-6.75ZM9 2.248a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z"
      fill={props.color ?? "#fff"}
    />
  </Svg>
)

export default BankIcon
