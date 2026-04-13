import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const WarningIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      d="M8.999 0c.499 0 .96.264 1.213.696l7.593 12.938a1.404 1.404 0 0 1-1.212 2.116H1.405c-.503 0-.97-.27-1.22-.707a1.412 1.412 0 0 1 .007-1.41L7.786.697A1.404 1.404 0 0 1 8.999 0Zm0 4.5a.842.842 0 0 0-.844.844V9.28c0 .468.376.844.844.844a.842.842 0 0 0 .843-.844V5.344A.842.842 0 0 0 9 4.5Zm1.125 7.875a1.125 1.125 0 1 0-2.25 0 1.125 1.125 0 0 0 2.25 0Z"
      fill="#D97706"
    />
  </Svg>
)

export default WarningIcon
