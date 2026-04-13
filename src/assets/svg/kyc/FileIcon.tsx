import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const FileIcon = (props: SvgProps) => (
  <Svg
    width={ props.width?? 14}
    height={ props.height?? 18}
    viewBox="0 0  14 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M2.25 0A2.252 2.252 0 0 0 0 2.25v13.5A2.252 2.252 0 0 0 2.25 18h9a2.252 2.252 0 0 0 2.25-2.25V5.625H9A1.124 1.124 0 0 1 7.875 4.5V0H2.25ZM9 0v4.5h4.5L9 0ZM2.812 2.25h2.25c.31 0 .563.253.563.563 0 .309-.253.562-.563.562h-2.25a.564.564 0 0 1-.562-.563c0-.309.253-.562.563-.562Zm0 2.25h2.25c.31 0 .563.253.563.563 0 .309-.253.562-.563.562h-2.25a.564.564 0 0 1-.562-.563c0-.309.253-.562.563-.562Zm.563 3.375h6.75c.622 0 1.125.503 1.125 1.125v2.25c0 .622-.503 1.125-1.125 1.125h-6.75A1.124 1.124 0 0 1 2.25 11.25V9c0-.622.503-1.125 1.125-1.125Zm0 1.125v2.25h6.75V9h-6.75Zm5.063 5.625h2.25c.309 0 .562.253.562.563 0 .309-.253.562-.563.562h-2.25a.564.564 0 0 1-.562-.563c0-.309.253-.562.563-.562Z"
        fill={props.color??"#374151"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h13.5v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default FileIcon
