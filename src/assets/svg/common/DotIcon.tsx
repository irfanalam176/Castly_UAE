import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const DotIcon = (props: SvgProps) => (
  <Svg
    width={props.width??12}
    height={props.height??12}
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <Path d="M0 6a6 6 0 1 1 12 0A6 6 0 0 1 0 6Z" fill={props.color??"#374151"} />
  </Svg>
)

export default DotIcon
