import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ShieldIcon = (props: SvgProps) => (
  <Svg
    width={props.width??18}
    height={props.height??18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M9 0c.162 0 .323.035.471.102l6.62 2.809c.773.327 1.35 1.09 1.346 2.01-.017 3.488-1.451 9.87-7.509 12.77a2.147 2.147 0 0 1-1.856 0C2.014 14.79.58 8.409.562 4.92c-.003-.92.574-1.683 1.347-2.01L8.532.102A1.12 1.12 0 0 1 9 0Zm0 2.348v13.29c4.852-2.349 6.156-7.549 6.188-10.667L9 2.348Z"
        fill={props.color??"#16A34A"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h18v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default ShieldIcon
