import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const SendIcon = (props: SvgProps) => (
  <Svg
    width={ props.width??12}
    height={ props.height??12}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M11.675.131a.75.75 0 0 1 .316.732l-1.5 9.75a.75.75 0 0 1-1.031.576l-2.804-1.165-1.605 1.737a.75.75 0 0 1-1.3-.51V9.29c0-.094.034-.183.098-.251l3.928-4.287a.375.375 0 0 0-.525-.532L2.485 8.456.415 7.42A.747.747 0 0 1 0 6.771.755.755 0 0 1 .378 6.1l10.5-6a.752.752 0 0 1 .796.032Z"
        fill={props.color??"#9CA3AF"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h12v12H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SendIcon
