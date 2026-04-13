import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"

const AppIcon = (props: SvgProps) => (
  <Svg
    width={123}
    height={26}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h122.07v25.992H0z" />
    <Defs>
      <Pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#b" transform="scale(.00645 .0303)" />
      </Pattern>
      <Image
        id="b"
        width={155}
        height={33}
        preserveAspectRatio="none"
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
)

export default AppIcon
