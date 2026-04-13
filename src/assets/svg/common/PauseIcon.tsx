import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const PauseIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 45.812}
    height={ props.height || 45.812}
    viewBox="0 0 45.812 45.812"
    fill={props.color || "black"}
    {...props}
  >
    <Path d="M39.104 6.708c-8.946-8.943-23.449-8.946-32.395 0-8.946 8.944-8.946 23.447 0 32.394 8.944 8.946 23.449 8.946 32.395 0 8.943-8.946 8.943-23.449 0-32.394zM20.051 31.704a2.64 2.64 0 0 1-5.281 0V14.108a2.64 2.64 0 0 1 5.281 0v17.596zm10.99 0a2.64 2.64 0 0 1-5.28 0V14.108c0-1.457 1.183-2.64 2.64-2.64s2.64 1.183 2.64 2.64v17.596z" />
  </Svg>
)

export default PauseIcon
