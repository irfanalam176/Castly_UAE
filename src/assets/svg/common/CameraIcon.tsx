import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CameraIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 21}
    height={ props.height || 17}
    viewBox="0 0 21 17"
    fill="none"
    {...props}
  >
    <Path
      d="M12.37.916H7.789l-2.291 2.75H2.749A1.833 1.833 0 0 0 .917 5.497v8.246a1.833 1.833 0 0 0 1.832 1.833h14.66a1.833 1.833 0 0 0 1.833-1.833V5.498a1.833 1.833 0 0 0-1.832-1.833h-2.75L12.37.916Z"
      stroke={props.color||"#9CA3AF"}
      strokeWidth={1.833}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.08 11.912a2.749 2.749 0 1 0 0-5.498 2.749 2.749 0 0 0 0 5.498Z"
      stroke={props.color||"#9CA3AF"}
      strokeWidth={1.833}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CameraIcon
