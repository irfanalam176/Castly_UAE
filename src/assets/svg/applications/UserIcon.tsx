import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const UserIcon = (props: SvgProps) => (
  <Svg
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke="#9CA3AF"
      strokeWidth={1.007}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M8.053 11.024v-1.006A2.013 2.013 0 0 0 6.04 8.005H3.02a2.013 2.013 0 0 0-2.013 2.013v1.006M4.53 5.991a2.013 2.013 0 1 0 0-4.026 2.013 2.013 0 0 0 0 4.026ZM11.073 11.024v-1.006a2.013 2.013 0 0 0-1.51-1.948M8.053 2.03a2.013 2.013 0 0 1 0 3.9" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12.08v12.989H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default UserIcon
