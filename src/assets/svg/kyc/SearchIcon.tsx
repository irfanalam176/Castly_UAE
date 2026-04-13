import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const SearchIcon = (props: SvgProps) => (
  <Svg
    width={ props.width?? 18}
    height={ props.height?? 18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M14.625 7.313a7.295 7.295 0 0 1-1.406 4.313l4.45 4.455a1.127 1.127 0 0 1-1.592 1.592l-4.45-4.454a7.271 7.271 0 0 1-4.315 1.406A7.311 7.311 0 0 1 0 7.312 7.311 7.311 0 0 1 7.313 0a7.311 7.311 0 0 1 7.312 7.313Zm-7.313 5.062a5.061 5.061 0 0 0 3.58-8.642 5.062 5.062 0 1 0-3.58 8.642Z"
        fill={props.color??"#9CA3AF"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h18v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default SearchIcon
