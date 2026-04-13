import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const RightIosArrow = (props: SvgProps) => (
  <Svg
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      d="m6.37 12.74 4.247-4.247L6.37 4.247"
      stroke="#111827"
      strokeWidth={1.416}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default RightIosArrow
