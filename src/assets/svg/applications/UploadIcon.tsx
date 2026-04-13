import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const UploadIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 16}
    height={ props.height || 16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <Path
      d="M13.999 9.999v2.666a1.333 1.333 0 0 1-1.334 1.333H3.333A1.333 1.333 0 0 1 2 12.665V10M11.332 5.333 7.999 2 4.666 5.333M7.999 2v7.999"
      stroke={props.color || "#6B7280"}
      strokeWidth={1.333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default UploadIcon
