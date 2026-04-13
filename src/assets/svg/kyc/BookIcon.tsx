import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const BookIcon = (props: SvgProps) => (
  <Svg
    width={ props.width?? 16}
    height={ props.height?? 18}
    viewBox="0 0 16 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M3.375 0A3.376 3.376 0 0 0 0 3.375v11.25A3.376 3.376 0 0 0 3.375 18h11.25c.622 0 1.125-.503 1.125-1.125s-.503-1.125-1.125-1.125V13.5c.622 0 1.125-.503 1.125-1.125V1.125C15.75.503 15.247 0 14.625 0H3.375Zm0 13.5h9v2.25h-9a1.124 1.124 0 1 1 0-2.25ZM4.5 5.062c0-.309.253-.562.563-.562h6.75c.309 0 .562.253.562.563 0 .309-.253.562-.563.562h-6.75a.564.564 0 0 1-.562-.563Zm.563 1.688h6.75c.309 0 .562.253.562.563 0 .309-.253.562-.563.562h-6.75a.564.564 0 0 1-.562-.563c0-.309.253-.562.563-.562Z"
        fill={props.color??"#4F46E5"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h15.75v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default BookIcon
