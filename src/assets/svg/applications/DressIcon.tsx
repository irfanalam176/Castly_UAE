import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const DressIcon = (props: SvgProps) => (
  <Svg
    width={20}
    height={16}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M6.619 0c.244 0 .447.178.522.412a3 3 0 0 0 5.719 0c.075-.234.278-.412.521-.412h.394c.703 0 1.381.247 1.922.697l3.944 3.284a1.006 1.006 0 0 1 .112 1.428l-1.75 2a1 1 0 0 1-1.393.11L15 6.179V14c0 1.103-.897 2-2 2H7c-1.103 0-2-.897-2-2V6.178l-1.61 1.34c-.415.348-1.034.3-1.393-.109l-1.75-2a1.006 1.006 0 0 1 .112-1.428L4.304.697A3.001 3.001 0 0 1 6.225 0h.394Z"
        fill="#9333EA"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h20v16H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default DressIcon
