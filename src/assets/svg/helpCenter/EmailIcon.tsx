import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const EmailIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      d="M1.5 0a1.5 1.5 0 0 0-.9 2.7l6.8 5.1c.356.266.844.266 1.2 0l6.8-5.1a1.5 1.5 0 0 0-.9-2.7h-13ZM0 3.5V10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V3.5L9.2 8.6a1.997 1.997 0 0 1-2.4 0L0 3.5Z"
      fill="#4F46E5"
    />
  </Svg>
)

export default EmailIcon
