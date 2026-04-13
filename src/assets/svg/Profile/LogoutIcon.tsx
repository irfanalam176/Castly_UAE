import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const LogoutIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      d="M6 13.998H3.332A1.333 1.333 0 0 1 2 12.665V3.333A1.333 1.333 0 0 1 3.333 2h2.666M10.665 11.332 14 8l-3.334-3.333M13.998 7.999H6"
      stroke="#DC2626"
      strokeWidth={1.333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default LogoutIcon
