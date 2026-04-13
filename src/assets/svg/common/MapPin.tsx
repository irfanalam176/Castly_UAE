import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const MapPin = (props: SvgProps) => (
  <Svg
    width={ props.width || 11}
    height={ props.height || 11}
    viewBox="0 0 11 11"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#6B7280"}
      strokeWidth={0.916}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.158 4.58c0 2.285-2.536 4.667-3.388 5.402a.458.458 0 0 1-.55 0c-.852-.735-3.388-3.117-3.388-5.403a3.663 3.663 0 1 1 7.326 0Z" />
      <Path d="M5.495 5.953a1.374 1.374 0 1 0 0-2.748 1.374 1.374 0 0 0 0 2.748Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h10.99v10.99H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default MapPin
