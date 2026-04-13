import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { colors } from "../../../utils/colors"

const RedditIcon = (props: SvgProps) => (
  <Svg
    viewBox="-0.5 -0.5 16 16"
      width={ props.width || 14}
    height={ props.height || 14}
    {...props}
  >
    <Path
      d="M2.131 8.975a5.369 3.875 0 1 0 10.738 0 5.369 3.875 0 1 0-10.738 0"
      fill="none"
      stroke={ props.color || colors.white}
      strokeMiterlimit={10}
    />
    <Path
      d="M2.15 8.656A1.494 1.494 0 1 1 3.625 6.3M12.85 8.656A1.494 1.494 0 1 0 11.375 6.3M5.112 10.469a4.45 4.45 0 0 0 2.388.594 4.45 4.45 0 0 0 2.387-.594M5.112 8.381a.3.3 0 1 0 .6 0 .3.3 0 1 0-.6 0M9.287 8.381a.3.3 0 1 0 .6 0 .3.3 0 1 0-.6 0M7.5 5.1l.6-2.981 2.981.593"
      fill="none"
      stroke={ props.color || colors.white}
      strokeMiterlimit={10}
    />
    <Path
      d="M11.081 2.712a1.194 1.194 0 1 0 2.388 0 1.194 1.194 0 1 0-2.388 0"
      fill="none"
      stroke={ props.color || colors.white}
      strokeMiterlimit={10}
    />
  </Svg>
)

export default RedditIcon
