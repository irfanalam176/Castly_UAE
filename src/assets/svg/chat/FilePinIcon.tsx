import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const FilePinIcon = (props: SvgProps) => (
  <Svg
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke="#9CA3AF"
      strokeWidth={1.249}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="m8.265 12.649 4.85-4.967M9.993 3.747 4.738 9.11a1.25 1.25 0 0 0 1.766 1.766l5.255-5.363a2.498 2.498 0 0 0-3.532-3.532L2.97 7.343a3.748 3.748 0 0 0 5.3 5.3" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h14.989v14.989H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default FilePinIcon
