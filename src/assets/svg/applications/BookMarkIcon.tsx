import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const BookMarkIcon = (props: SvgProps) => (
  <Svg
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      d="m11.867 13.116-4.372-2.498-4.372 2.498V3.123a1.25 1.25 0 0 1 1.249-1.25h6.245a1.25 1.25 0 0 1 1.25 1.25v9.993Z"
      stroke="#fff"
      strokeWidth={1.249}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default BookMarkIcon
