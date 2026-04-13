import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ProfileIcon = (props: SvgProps) => (
  <Svg
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      d="M16.617 18.367v-1.75a3.498 3.498 0 0 0-3.498-3.498H7.871a3.498 3.498 0 0 0-3.498 3.498v1.75M10.495 9.62a3.498 3.498 0 1 0 0-6.996 3.498 3.498 0 0 0 0 6.997Z"
      stroke="#9CA3AF"
      strokeWidth={1.749}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default ProfileIcon
