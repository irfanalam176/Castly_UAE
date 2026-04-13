import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ChatIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M5.625 12.938c.932 0 1.688.755 1.688 1.687v.563l2.548-1.913a1.693 1.693 0 0 1 1.013-.338h4.876c.31 0 .563-.253.563-.562V2.25a.564.564 0 0 0-.563-.563H2.25a.564.564 0 0 0-.563.563v10.125c0 .31.254.563.563.563h3.375Zm1.688 4.359-.008.007-.179.134-.601.45a.568.568 0 0 1-.59.052.553.553 0 0 1-.31-.503V14.625H2.25A2.252 2.252 0 0 1 0 12.375V2.25A2.252 2.252 0 0 1 2.25 0h13.5A2.252 2.252 0 0 1 18 2.25v10.125a2.252 2.252 0 0 1-2.25 2.25h-4.876l-3.562 2.672Z"
        fill="#000"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h18v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ChatIcon
