import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const BookMarkIconFill = (props: SvgProps) => (
  <Svg
    width={12}
    height={16}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M0 1.5v13.74a.76.76 0 0 0 1.197.623L6 12.5l4.803 3.363A.76.76 0 0 0 12 15.24V1.5A1.5 1.5 0 0 0 10.5 0h-9A1.5 1.5 0 0 0 0 1.5Z"
        fill="#4F46E5"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h12v16H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default BookMarkIconFill
