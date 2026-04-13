import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const EyeIcon = (props: SvgProps) => (
  <Svg
    width={props.width??14}
    height={props.height??12}
    viewBox="0 0 14 12"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M6.75.75c-1.893 0-3.41.863-4.514 1.89C1.14 3.655.406 4.874.06 5.711a.745.745 0 0 0 0 .576c.347.837 1.08 2.056 2.177 3.073 1.104 1.026 2.62 1.889 4.514 1.889 1.894 0 3.41-.863 4.514-1.89 1.097-1.019 1.83-2.235 2.18-3.072a.745.745 0 0 0 0-.576c-.35-.837-1.083-2.056-2.18-3.073C10.162 1.613 8.645.75 6.75.75ZM3.375 6a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM6.75 4.5a1.501 1.501 0 0 1-1.975 1.423c-.13-.043-.28.037-.275.173A2.251 2.251 0 1 0 6.846 3.75c-.135-.005-.215.143-.173.274.05.15.077.31.077.476Z"
        fill={props.color??"#9CA3AF"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h13.5v12H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default EyeIcon
