import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const CalendarIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 14 }
    height={props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#15803D"}
      strokeWidth={1.166}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4.666 1.166V3.5M9.332 1.166V3.5M11.08 2.333H2.917c-.644 0-1.166.522-1.166 1.166v8.165c0 .644.522 1.167 1.166 1.167h8.165c.644 0 1.166-.523 1.166-1.167V3.5c0-.644-.522-1.166-1.166-1.166ZM1.75 5.832h10.497" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13.997v13.997H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default CalendarIcon
