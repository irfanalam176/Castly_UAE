import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const BackIdIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 21}
    height={props.height || 18}
    viewBox="0 0 21 18"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M9 0h2.25c.622 0 1.125.503 1.125 1.125v2.25c0 .622-.503 1.125-1.125 1.125H9a1.124 1.124 0 0 1-1.125-1.125v-2.25C7.875.503 8.378 0 9 0ZM2.25 2.25h4.5v1.688c0 .931.756 1.687 1.688 1.687h3.374c.932 0 1.688-.756 1.688-1.688V2.25H18a2.252 2.252 0 0 1 2.25 2.25v11.25A2.252 2.252 0 0 1 18 18H2.25A2.252 2.252 0 0 1 0 15.75V4.5a2.252 2.252 0 0 1 2.25-2.25Zm3.938 13.124c0 .207.168.376.376.376h7.122a.377.377 0 0 0 .377-.376c0-1.037-.84-1.874-1.874-1.874H8.06c-1.037 0-1.873.84-1.873 1.874Zm3.937-2.999a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
        fill={props.color??"#4B5563"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h20.25v18H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default BackIdIcon
