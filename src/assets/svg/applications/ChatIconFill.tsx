import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ChatIconFill = (props: SvgProps) => (
  <Svg
    width={props.width??16}
    height={props.height??16}
    viewBox="0 0 16 16"
    fill="none"
    
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M2 0C.897 0 0 .897 0 2v9c0 1.103.897 2 2 2h3v2.5a.498.498 0 0 0 .8.4L9.666 13H14c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2H2Z"
        fill={props.color??"#374151"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h16v16H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ChatIconFill
