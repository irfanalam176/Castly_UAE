import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const HeadPhoneIcon = (props: SvgProps) => (
  <Svg
    width={ props.width??16}
    height={ props.height?? 16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <Path
      d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8v1.25c0 .416-.334.75-.75.75A.748.748 0 0 1 0 9.25V8a8 8 0 0 1 8-8 8 8 0 0 1 8 8v4.503a2.75 2.75 0 0 1-2.753 2.75L9.8 15.25c-.26.447-.744.75-1.3.75h-1a1.5 1.5 0 0 1 0-3h1c.556 0 1.04.303 1.3.75l3.45.003c.69 0 1.25-.56 1.25-1.25V8c0-3.59-2.91-6.5-6.5-6.5Zm-3.5 5H5c.553 0 1 .447 1 1V11c0 .553-.447 1-1 1h-.5c-1.103 0-2-.897-2-2V8.5c0-1.103.897-2 2-2Zm7 0c1.103 0 2 .897 2 2V10c0 1.103-.897 2-2 2H11c-.553 0-1-.447-1-1V7.5c0-.553.447-1 1-1h.5Z"
      fill={props.color??"#374151"}
    />
  </Svg>
)

export default HeadPhoneIcon
