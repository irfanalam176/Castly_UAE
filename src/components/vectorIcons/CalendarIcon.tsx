import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

function CalendarIcon(props:SvgProps) {
  return (
    <Svg
      width={ props.width || 13}
      height={props.height || 14}
      viewBox="0 0 13 14"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1_5065)">
        <Path
          d="M4.156.656A.655.655 0 003.5 0a.655.655 0 00-.656.656V1.75H1.75C.785 1.75 0 2.535 0 3.5v8.75C0 13.215.785 14 1.75 14h8.75c.965 0 1.75-.785 1.75-1.75V3.5c0-.965-.785-1.75-1.75-1.75H9.406V.656A.655.655 0 008.75 0a.655.655 0 00-.656.656V1.75H4.156V.656zM1.313 5.25h9.624v7c0 .24-.196.438-.437.438H1.75a.439.439 0 01-.438-.438v-7z"
          fill={props.color || "#9CA3AF"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_5065">
          <Path d="M0 0h12.25v14H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CalendarIcon
