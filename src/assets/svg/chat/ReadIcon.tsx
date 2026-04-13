import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ReadIcon = (props: SvgProps) => (
  <Svg
    width={11}
    height={12}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M8.03 2.03A.751.751 0 0 0 6.967.968L3.75 4.188 2.404 2.843a.751.751 0 0 0-1.061 1.062L3.218 5.78a.751.751 0 0 0 1.061 0l3.75-3.75Zm2.25 3a.751.751 0 0 0-1.062-1.062L3.75 9.438 1.28 6.97A.751.751 0 0 0 .217 8.032l3 3a.751.751 0 0 0 1.061 0l6-6V5.03Z"
        fill="#16A34A"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h10.5v12H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ReadIcon
