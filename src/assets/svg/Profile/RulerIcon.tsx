import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const RulerIcon = (props: SvgProps) => (
  <Svg
    width={props.width||14}
    height={ props.height||14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color||"#4338CA"}
      strokeWidth={1.166}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12.422 8.923a1.4 1.4 0 0 1 0 1.983l-1.516 1.516a1.402 1.402 0 0 1-1.983 0L1.575 5.074a1.406 1.406 0 0 1 0-1.983L3.09 1.575a1.406 1.406 0 0 1 1.983 0l7.348 7.348ZM8.457 7.29l1.166-1.166M6.707 5.54l1.166-1.166M4.957 3.79l1.167-1.165M10.206 9.04l1.167-1.167" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13.997v13.997H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default RulerIcon
