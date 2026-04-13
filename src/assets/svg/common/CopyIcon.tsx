import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const CopyIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 11}
    height={ props.height || 11}
    viewBox="0 0 11 11"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#9CA3AF"}
      strokeWidth={0.916}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.16 3.664H4.58a.916.916 0 0 0-.916.916v4.58c0 .505.41.915.916.915h4.58c.505 0 .915-.41.915-.916V4.58a.916.916 0 0 0-.916-.915Z" />
      <Path d="M1.832 7.327a.919.919 0 0 1-.916-.915v-4.58c0-.504.412-.916.916-.916h4.58c.503 0 .915.412.915.916" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h10.991v10.991H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default CopyIcon
