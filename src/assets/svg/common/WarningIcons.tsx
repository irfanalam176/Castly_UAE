import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const WarningIcons = (props: SvgProps) => (
  <Svg
    width={props.width || 14}
    height={ props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || "#DC2626"}
      strokeWidth={1.165}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12.663 10.489 8 2.331a1.166 1.166 0 0 0-2.028 0l-4.662 8.158a1.166 1.166 0 0 0 1.02 1.748h9.324a1.165 1.165 0 0 0 1.008-1.748ZM6.993 5.245v2.33M6.993 9.906h.006" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13.986v13.986H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default WarningIcons
