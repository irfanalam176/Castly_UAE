import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const FlashIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 12}
    height={ props.height || 13}
    viewBox="0 0 12 13"
    fill="none"
    {...props}
  >
    <Path
      d="M1.168 7.583a.583.583 0 0 1-.454-.95L6.487.683a.292.292 0 0 1 .502.27l-1.12 3.51a.583.583 0 0 0 .548.787H10.5a.583.583 0 0 1 .455.951L5.18 12.15a.293.293 0 0 1-.488-.076.292.292 0 0 1-.014-.192L5.8 8.37a.583.583 0 0 0-.548-.788H1.168Z"
      stroke={props.color || "#CA8A04"}
      strokeWidth={1.166}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default FlashIcon
