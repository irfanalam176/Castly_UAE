import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CompassIcon = (props: SvgProps) => (
  <Svg
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      d="m14.21 6.79-1.579 4.734a1.75 1.75 0 0 1-1.107 1.107L6.79 14.21l1.578-4.735a1.75 1.75 0 0 1 1.107-1.107L14.21 6.79Z"
      stroke="#9CA3AF"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 19.25a8.75 8.75 0 1 0 0-17.5 8.75 8.75 0 0 0 0 17.5Z"
      stroke="#9CA3AF"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CompassIcon
