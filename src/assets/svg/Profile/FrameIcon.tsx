import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const FrameIcon = (props: SvgProps) => (
  <Svg
    viewBox="0 0 6 14"
    width="100%"
    height="100%"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M1.313 2.188a1.313 1.313 0 1 1 2.625 0 1.313 1.313 0 0 1-2.626 0ZM0 6.124c0-.484.391-.875.875-.875h1.75c.484 0 .875.391.875.875v6.125h.875a.874.874 0 1 1 0 1.75h-3.5a.874.874 0 1 1 0-1.75h.875V7H.875A.874.874 0 0 1 0 6.125Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h5.25v14H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default FrameIcon
