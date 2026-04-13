import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const HistoryIcon = (props: SvgProps) => (
  <Svg
    width={ props.width?? 18}
    height={ props.height?? 18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M2.637 2.637 1.44 1.44C.911.911 0 1.287 0 2.036v3.87c0 .468.376.844.844.844h3.87c.753 0 1.129-.91.598-1.441L4.23 4.226A6.752 6.752 0 0 1 15.75 9a6.752 6.752 0 0 1-10.606 5.54 1.127 1.127 0 0 0-1.568.278c-.358.51-.232 1.21.278 1.568A8.997 8.997 0 0 0 9 18a9 9 0 0 0 9-9A9 9 0 0 0 2.637 2.637ZM9 4.5a.842.842 0 0 0-.844.844V9c0 .225.088.44.246.598l2.532 2.53a.843.843 0 0 0 1.192-1.192L9.84 8.653V5.344a.842.842 0 0 0-.844-.844H9Z"
        fill={props.color??"#374151"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h18v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default HistoryIcon
