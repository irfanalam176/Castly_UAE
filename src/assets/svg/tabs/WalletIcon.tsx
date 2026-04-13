import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const WalletIcon = (props: SvgProps) => (
  <Svg
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      d="M16.617 6.122V3.498a.874.874 0 0 0-.874-.874H4.373a1.75 1.75 0 1 0 0 3.498h13.119a.874.874 0 0 1 .875.875v3.498m0 0h-2.624a1.75 1.75 0 0 0 0 3.499h2.624a.874.874 0 0 0 .874-.875v-1.75a.874.874 0 0 0-.874-.874Z"
      stroke="#9CA3AF"
      strokeWidth={1.749}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.624 4.373v12.244a1.75 1.75 0 0 0 1.749 1.75h13.119a.874.874 0 0 0 .875-.875v-3.498"
      stroke="#9CA3AF"
      strokeWidth={1.749}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default WalletIcon
