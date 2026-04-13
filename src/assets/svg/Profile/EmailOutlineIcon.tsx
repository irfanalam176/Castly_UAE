import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const EmailOutlineIcon = (props: SvgProps) => (
  <Svg
    width={18}
    height={14}
    fill="none"
    {...props}
  >
    <Path
      d="M2.25 1.688a.564.564 0 0 0-.563.562v.777l6.065 4.978a1.967 1.967 0 0 0 2.5 0l6.06-4.978V2.25a.564.564 0 0 0-.562-.563H2.25ZM1.687 5.21v6.04c0 .31.254.563.563.563h13.5c.31 0 .563-.254.563-.563V5.21l-4.993 4.1a3.656 3.656 0 0 1-4.64 0l-4.992-4.1ZM0 2.25A2.252 2.252 0 0 1 2.25 0h13.5A2.252 2.252 0 0 1 18 2.25v9a2.252 2.252 0 0 1-2.25 2.25H2.25A2.252 2.252 0 0 1 0 11.25v-9Z"
      fill="#9CA3AF"
    />
  </Svg>
)

export default EmailOutlineIcon
