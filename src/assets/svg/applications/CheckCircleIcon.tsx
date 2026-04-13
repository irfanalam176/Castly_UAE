import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const CheckCircleIcon = (props: SvgProps) => (
  <Svg
    width={props.width??12}
    height={props.height??12}
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12Zm2.648-7.102-3 3a.56.56 0 0 1-.794 0l-1.5-1.5a.562.562 0 0 1 .795-.795L5.25 6.706l2.602-2.603a.562.562 0 0 1 .795.795l.001.001Z"
        fill={props.color??"#4B5563"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h12v12H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default CheckCircleIcon
