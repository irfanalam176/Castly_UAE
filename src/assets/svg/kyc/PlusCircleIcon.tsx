import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const PlusCircleIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 12}
    height={props.height || 12}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12Zm-.563-3.938v-1.5h-1.5A.561.561 0 0 1 3.375 6c0-.312.25-.563.563-.563h1.5v-1.5a.561.561 0 1 1 1.125 0v1.5h1.5c.311 0 .562.251.562.563 0 .312-.25.563-.563.563h-1.5v1.5a.561.561 0 1 1-1.125 0Z"
        fill={props.color || "#6B7280"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h12v12H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default PlusCircleIcon
