import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ClipBoardIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={16}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M6 0a2.997 2.997 0 0 0-2.828 2H2C.897 2 0 2.897 0 4v10c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H8.828A2.997 2.997 0 0 0 6 0Zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM2.25 8.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM5.5 8h4c.275 0 .5.225.5.5s-.225.5-.5.5h-4a.501.501 0 0 1-.5-.5c0-.275.225-.5.5-.5Zm-3.25 3.5a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm2.75 0c0-.275.225-.5.5-.5h4c.275 0 .5.225.5.5s-.225.5-.5.5h-4a.501.501 0 0 1-.5-.5Z"
        fill="#2563EB"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h12v16H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ClipBoardIcon
