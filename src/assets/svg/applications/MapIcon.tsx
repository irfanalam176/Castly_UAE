import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const MapIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      d="M14.992 7.496c0 3.742-4.152 7.64-5.547 8.844a.75.75 0 0 1-.9 0C7.15 15.136 2.997 11.24 2.997 7.496a5.997 5.997 0 0 1 11.994 0Z"
      stroke="#EF4444"
      strokeWidth={1.499}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.995 9.745a2.249 2.249 0 1 0 0-4.498 2.249 2.249 0 0 0 0 4.498Z"
      stroke="#EF4444"
      strokeWidth={1.499}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default MapIcon
