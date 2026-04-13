import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ClockFill = (props: SvgProps) => (
  <Svg
    width={props.width??10}
    height={props.height??10}
    viewBox="0 0 10 10"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M5 0a5 5 0 1 1 0 10A5 5 0 0 1 5 0Zm-.469 2.344V5a.47.47 0 0 0 .21.39l1.874 1.25a.468.468 0 0 0 .65-.13.467.467 0 0 0-.13-.65L5.469 4.75V2.344a.468.468 0 1 0-.938 0Z"
        fill={props.color??"#B45309"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h10v10H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ClockFill
