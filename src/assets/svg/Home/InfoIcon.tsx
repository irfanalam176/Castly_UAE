import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

function InfoIcon(props:SvgProps) {
  return (
    <Svg
      width={props.width??14}
      height={props.height??14}
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1_3996)">
        <Path
          d="M7 14A7 7 0 107 0a7 7 0 000 14zM7 3.5c.364 0 .656.293.656.656V7.22A.655.655 0 017 7.875a.655.655 0 01-.656-.656V4.156c0-.363.292-.656.656-.656zm-.875 6.125a.875.875 0 111.75 0 .875.875 0 01-1.75 0z"
          fill={props.color??"#D97706"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_3996">
          <Path d="M0 0h14v14H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default InfoIcon
