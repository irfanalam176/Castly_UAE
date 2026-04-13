import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CalendarIcon = (props: SvgProps) => (
  <Svg
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      d="M4.33 1.082v2.165M8.66 1.082v2.165M10.283 2.165H2.706c-.598 0-1.082.484-1.082 1.082v7.577c0 .598.484 1.083 1.082 1.083h7.577c.598 0 1.082-.485 1.082-1.083V3.247c0-.598-.484-1.082-1.082-1.082ZM1.624 5.412h9.741"
      stroke="#111827"
      strokeWidth={1.082}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CalendarIcon
