import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ChatRoundIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M9 15.75c4.971 0 9-3.273 9-7.313 0-4.039-4.029-7.312-9-7.312S0 4.398 0 8.438c0 1.585.622 3.051 1.677 4.25-.067.861-.401 1.628-.753 2.211a6.339 6.339 0 0 1-.706.96c-.021.021-.035.039-.046.05l-.01.01a.563.563 0 0 0 .4.96c1.01 0 2.025-.313 2.87-.679.804-.352 1.49-.77 1.908-1.076 1.118.404 2.356.63 3.66.63v-.004ZM4.5 7.312a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Zm4.5 0a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Zm3.375 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
        fill="#fff"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h18v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ChatRoundIcon
