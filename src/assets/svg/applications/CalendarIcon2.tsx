import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const CalendarIcon2 = (props: SvgProps) => (
  <Svg
    width={13}
    height={14}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M4.156.656A.655.655 0 0 0 3.5 0a.655.655 0 0 0-.656.656V1.75H1.75C.785 1.75 0 2.535 0 3.5v8.75C0 13.215.785 14 1.75 14h8.75c.965 0 1.75-.785 1.75-1.75V3.5c0-.965-.785-1.75-1.75-1.75H9.406V.656A.655.655 0 0 0 8.75 0a.655.655 0 0 0-.656.656V1.75H4.156V.656ZM1.313 5.25h9.624v7c0 .24-.196.438-.437.438H1.75a.439.439 0 0 1-.438-.438v-7Z"
        fill="#4B5563"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h12.25v14H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default CalendarIcon2
