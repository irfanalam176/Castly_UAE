import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const PinIcon2 = (props: SvgProps) => (
  <Svg
    width={11}
    height={14}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M5.898 13.65c1.403-1.755 4.602-6.01 4.602-8.4A5.251 5.251 0 0 0 5.25 0 5.251 5.251 0 0 0 0 5.25c0 2.39 3.2 6.645 4.602 8.4a.826.826 0 0 0 1.296 0ZM5.25 3.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Z"
        fill="#4B5563"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h10.5v14H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default PinIcon2
