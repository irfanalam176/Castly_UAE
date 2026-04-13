import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const FolderIcon = (props: SvgProps) => (
  <Svg
    width={21}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      d="m5.248 12.244 1.311-2.536a1.75 1.75 0 0 1 1.522-.962h9.411m0 0a1.749 1.749 0 0 1 1.697 2.186l-1.347 5.248a1.75 1.75 0 0 1-1.706 1.312H3.498a1.75 1.75 0 0 1-1.749-1.75V4.374a1.75 1.75 0 0 1 1.75-1.75h3.41a1.75 1.75 0 0 1 1.478.788l.709 1.05a1.75 1.75 0 0 0 1.46.787h5.187a1.749 1.749 0 0 1 1.749 1.749v1.749Z"
      stroke="#9CA3AF"
      strokeWidth={1.749}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default FolderIcon
