import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const LocationPin = (props: SvgProps) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke="#9CA3AF"
      strokeWidth={0.999}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.995 4.997c0 2.496-2.768 5.094-3.698 5.897a.5.5 0 0 1-.6 0c-.93-.803-3.698-3.401-3.698-5.897a3.998 3.998 0 1 1 7.996 0Z" />
      <Path d="M5.997 6.497a1.5 1.5 0 1 0 0-2.999 1.5 1.5 0 0 0 0 2.999Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h11.994v11.994H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default LocationPin
