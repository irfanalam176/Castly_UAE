import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const FlagIcon = (props: SvgProps) => (
  <Svg
    width={ props.width?? 18}
    height={ props.height?? 20}
    viewBox="0 0 18 20"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M2.5 1.25C2.5.559 1.941 0 1.25 0S0 .559 0 1.25v17.5C0 19.441.559 20 1.25 20s1.25-.559 1.25-1.25v-5l2.512-.629a6.947 6.947 0 0 1 4.785.524 6.918 6.918 0 0 0 5.535.289l1.355-.508c.489-.184.813-.649.813-1.172V2.582A1.21 1.21 0 0 0 15.75 1.5l-.375.188a6.412 6.412 0 0 1-5.746 0 6.426 6.426 0 0 0-4.434-.489L2.5 1.875V1.25Z"
        fill={props.color??"#DC2626"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h17.5v20H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default FlagIcon
