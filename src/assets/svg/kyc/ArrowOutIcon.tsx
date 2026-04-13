import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ArrowOutIcon = (props: SvgProps) => (
  <Svg
    width={ props.width?? 14}
    height={ props.height?? 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M8.75 0a.874.874 0 1 0 0 1.75h2.261L5.507 7.257a.876.876 0 0 0 1.239 1.239l5.504-5.507V5.25a.874.874 0 1 0 1.75 0V.875A.874.874 0 0 0 13.125 0H8.75ZM2.187.875A2.187 2.187 0 0 0 0 3.063v8.75C0 13.02.979 14 2.188 14h8.75a2.187 2.187 0 0 0 2.187-2.188V8.75a.874.874 0 1 0-1.75 0v3.063c0 .24-.197.437-.438.437h-8.75a.439.439 0 0 1-.437-.438v-8.75c0-.24.197-.437.438-.437H5.25a.874.874 0 1 0 0-1.75H2.187Z"
        fill={props.color??"#9CA3AF"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h14v14H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ArrowOutIcon
