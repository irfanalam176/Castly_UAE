import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { colors } from "../../../utils/colors"

interface PlayIconProps extends SvgProps {
  color?: string
}

const PlayIcon = ({ color = colors.primary, ...props }: PlayIconProps) => (
  <Svg
    width={props.width || 800}
    height={props.height || 800}
    fill="none"
    viewBox="0 0 60 60"
    {...props}
  >
    <Path
      fill={color}
      d="M30 0C13.458 0 0 13.458 0 30s13.458 30 30 30 30-13.458 30-30S46.542 0 30 0zm15.563 30.826-22 15a1.002 1.002 0 0 1-1.03.058A.999.999 0 0 1 22 45V15a.999.999 0 0 1 1.564-.826l22 15a1.001 1.001 0 0 1-.001 1.652z"
    />
  </Svg>
)

export default PlayIcon