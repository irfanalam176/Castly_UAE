import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const LoadingIcon = (props: SvgProps) => (
  <Svg
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      d="M8.313 1.313a1.313 1.313 0 1 0-2.626 0 1.313 1.313 0 0 0 2.625 0Zm0 11.374a1.313 1.313 0 1 0-2.626 0 1.313 1.313 0 0 0 2.625 0Zm-7-4.374a1.313 1.313 0 1 0 0-2.626 1.313 1.313 0 0 0 0 2.625ZM14 7a1.313 1.313 0 1 0-2.625 0A1.313 1.313 0 0 0 14 7ZM3.907 11.95a1.313 1.313 0 1 0-1.856-1.857 1.313 1.313 0 0 0 1.856 1.856Zm0-8.045A1.312 1.312 0 1 0 2.051 2.05a1.313 1.313 0 0 0 1.856 1.856v-.002Zm6.186 8.044a1.313 1.313 0 1 0 1.857-1.857 1.313 1.313 0 0 0-1.857 1.857Z"
      fill="#fff"
    />
  </Svg>
)

export default LoadingIcon
