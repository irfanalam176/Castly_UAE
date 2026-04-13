import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const MealIcon = (props: SvgProps) => (
  <Svg
    width={14}
    height={16}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M13 0c-.5 0-4 1-4 5.5V9c0 1.103.897 2 2 2h1v4a.999.999 0 1 0 2 0V1c0-.553-.447-1-1-1ZM2 .5a.498.498 0 0 0-.447-.497.497.497 0 0 0-.54.388L.066 4.65A2.75 2.75 0 0 0 2.5 7.987V15a.999.999 0 1 0 2 0V7.987A2.752 2.752 0 0 0 6.934 4.65L5.987.39A.5.5 0 0 0 5 .5v4.194a.307.307 0 0 1-.612.025L3.997.456A.497.497 0 0 0 3.5 0a.497.497 0 0 0-.497.456L2.616 4.72a.307.307 0 0 1-.612-.025V.5H2Zm1.51 4.75h-.02l.01-.022.01.022Z"
        fill="#16A34A"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h14v16H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default MealIcon
