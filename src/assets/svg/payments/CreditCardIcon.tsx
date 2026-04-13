import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CreditCardIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 18}
    height={ props.height || 18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      d="M14.995 3.749H2.998a1.5 1.5 0 0 0-1.5 1.499v7.497a1.5 1.5 0 0 0 1.5 1.5h11.996a1.5 1.5 0 0 0 1.499-1.5V5.248a1.5 1.5 0 0 0-1.5-1.5ZM1.5 7.497h14.994"
      stroke={props.color || "#4338CA"}
      strokeWidth={1.499}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CreditCardIcon
