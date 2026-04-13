import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const MapPinIcon = (props: SvgProps) => (
  <Svg
    width={props.width??12}
    height={props.height??18}
    viewBox="0 0 12 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M.563 5.063a5.063 5.063 0 1 1 10.125 0 5.063 5.063 0 0 1-10.126 0Zm5.062-2.25c.31 0 .563-.254.563-.563a.564.564 0 0 0-.563-.563A3.376 3.376 0 0 0 2.25 5.063c0 .31.253.563.563.563.309 0 .562-.253.562-.563a2.252 2.252 0 0 1 2.25-2.25ZM4.5 16.874v-5.727a6.257 6.257 0 0 0 2.25 0v5.727a1.124 1.124 0 1 1-2.25 0Z"
        fill={props.color??"#9CA3AF"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h11.25v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default MapPinIcon
