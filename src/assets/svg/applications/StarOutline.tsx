import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const StarOutline = (props: SvgProps) => (
  <Svg
    width={props.width??27}
    height={props.height??24}
    viewBox="0 0 27 24"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M13.495 0c.431 0 .825.244 1.012.633l3.216 6.623 7.181 1.06c.422.06.774.356.905.764a1.13 1.13 0 0 1-.277 1.148l-5.207 5.166 1.228 7.293c.07.422-.103.849-.45 1.102a1.12 1.12 0 0 1-1.186.08l-6.422-3.431-6.417 3.426c-.38.202-.84.174-1.186-.08a1.136 1.136 0 0 1-.455-1.101l1.228-7.294-5.208-5.16a1.122 1.122 0 0 1-.276-1.15c.131-.402.483-.698.905-.763l7.18-1.06L12.483.633c.193-.39.582-.633 1.013-.633Zm0 3.703-2.461 5.072a1.136 1.136 0 0 1-.848.623l-5.546.816 4.027 3.99c.258.257.38.623.319.983l-.952 5.611 4.931-2.634a1.117 1.117 0 0 1 1.06 0l4.93 2.634-.946-5.606c-.06-.36.056-.726.319-.984l4.026-3.99-5.545-.82a1.133 1.133 0 0 1-.848-.623l-2.466-5.072Z"
        fill={props.color??"#9CA3AF"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h27v24H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default StarOutline
