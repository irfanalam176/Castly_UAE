import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const HourGlassIcon = (props: SvgProps) => (
  <Svg
    width={props.width??14}
    height={props.height??18}
    viewBox="0 0 14 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M1.125 0a1.124 1.124 0 1 0 0 2.25v.387c0 1.49.594 2.921 1.649 3.976L5.157 9l-2.383 2.387a5.626 5.626 0 0 0-1.649 3.976v.387a1.124 1.124 0 1 0 0 2.25h11.25c.622 0 1.125-.503 1.125-1.125s-.503-1.125-1.125-1.125v-.387c0-1.49-.594-2.921-1.649-3.976L8.343 9l2.387-2.387a5.626 5.626 0 0 0 1.649-3.976V2.25a1.124 1.124 0 1 0 0-2.25H1.125Zm2.25 2.637V2.25h6.75v.387c0 .668-.197 1.315-.563 1.863H3.939a3.384 3.384 0 0 1-.563-1.863ZM3.938 13.5c.123-.186.267-.362.425-.524l2.387-2.383 2.387 2.387c.162.161.302.337.425.524H3.939V13.5Z"
        fill={props.color??"#D97706"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h13.5v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default HourGlassIcon
