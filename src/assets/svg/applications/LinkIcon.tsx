import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const LinkIcon = (props: SvgProps) => (
  <Svg
    width={ props.width??18}
    height={ props.width??14}
    viewBox="0 0 18 14"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M15.854 7.32a3.953 3.953 0 0 0-5.094-6.013l-.044.03a.875.875 0 0 0 1.017 1.422l.044-.03a2.203 2.203 0 0 1 2.838 3.352l-3.068 3.074a2.203 2.203 0 0 1-3.352-2.839l.03-.043a.874.874 0 0 0-1.422-1.018l-.03.044a3.953 3.953 0 0 0 6.01 5.091l3.07-3.07ZM1.646 6.68a3.953 3.953 0 0 0 5.094 6.013l.044-.03a.875.875 0 0 0-1.017-1.422l-.044.03a2.2 2.2 0 0 1-2.838-.235 2.207 2.207 0 0 1 0-3.12l3.068-3.07a2.205 2.205 0 0 1 3.352 2.841l-.03.043a.874.874 0 0 0 1.422 1.017l.03-.044a3.953 3.953 0 0 0-6.01-5.094L1.646 6.68Z"
        fill={props.color??"#9CA3AF"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h17.5v14H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default LinkIcon
