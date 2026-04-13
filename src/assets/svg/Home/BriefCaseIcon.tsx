import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const BriefCaseIcon = (props: SvgProps) => (
  <Svg
    width={12}
    height={12}
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke="#818CF8"
      strokeWidth={0.999}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M7.993 9.99V1.999a1 1 0 0 0-1-.999H4.996a1 1 0 0 0-.999 1V9.99" />
      <Path d="M9.99 2.997H1.999a1 1 0 0 0-.999 1v4.995a1 1 0 0 0 1 .999H9.99a1 1 0 0 0 .999-1V3.997a1 1 0 0 0-1-.999Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h11.989v11.989H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default BriefCaseIcon
