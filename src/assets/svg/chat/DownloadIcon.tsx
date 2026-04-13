import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const DownloadIcon = (props: SvgProps) => (
  <Svg
    width={ props.width??14}
    height={ props.height?? 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M7.875.875a.874.874 0 1 0-1.75 0v6.636L4.118 5.504a.876.876 0 0 0-1.239 1.239l3.5 3.5a.876.876 0 0 0 1.239 0l3.5-3.5a.876.876 0 0 0-1.239-1.239L7.875 7.511V.875ZM1.75 9.625c-.965 0-1.75.785-1.75 1.75v.875C0 13.215.785 14 1.75 14h10.5c.965 0 1.75-.785 1.75-1.75v-.875c0-.965-.785-1.75-1.75-1.75H9.475l-1.24 1.239a1.75 1.75 0 0 1-2.474 0L4.525 9.625H1.75Zm10.063 1.531a.656.656 0 1 1 0 1.312.656.656 0 0 1 0-1.312Z"
        fill={props.color??"#374151"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h14v14H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default DownloadIcon
