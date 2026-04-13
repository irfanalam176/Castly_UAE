import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const StarIcon = (props: SvgProps) => (
  <Svg
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <G clipPath="url(#b)">
        <Path
          d="M7.259 2.647a.265.265 0 0 1 .474 0l1.154 2.337a1.06 1.06 0 0 0 .797.58l2.58.377a.264.264 0 0 1 .147.452L10.545 8.21a1.06 1.06 0 0 0-.305.938l.44 2.568a.265.265 0 0 1-.385.28l-2.307-1.213a1.06 1.06 0 0 0-.985 0l-2.307 1.213a.266.266 0 0 1-.384-.28l.44-2.567a1.06 1.06 0 0 0-.305-.939L2.58 6.393a.265.265 0 0 1 .147-.452l2.58-.377a1.06 1.06 0 0 0 .798-.58L7.26 2.647Z"
          fill="#F7FF36"
          stroke="#F7FF36"
          strokeWidth={0.999}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="b">
        <Path
          fill="#fff"
          transform="translate(1.501 1.5)"
          d="M0 0h11.989v11.989H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
)

export default StarIcon
