import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ArrowRight = (props: SvgProps) => (
  <Svg
    width={props.width??8}
    height={props.height??12}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M7.28 5.47a.751.751 0 0 1 0 1.062l-4.5 4.5A.751.751 0 0 1 1.717 9.97L5.688 6 1.72 2.03A.751.751 0 0 1 2.782.967l4.5 4.5-.003.002Z"
        fill="#9CA3AF"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h7.5v12H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ArrowRight
