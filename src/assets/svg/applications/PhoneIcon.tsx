import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const PhoneIcon = (props: SvgProps) => (
  <Svg
    width={props.width??16}
    height={props.width??16}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M5.153.769A1.246 1.246 0 0 0 3.672.044l-2.75.75C.378.944 0 1.438 0 2c0 7.731 6.269 14 14 14 .563 0 1.056-.378 1.206-.922l.75-2.75a1.246 1.246 0 0 0-.725-1.48l-3-1.25a1.246 1.246 0 0 0-1.447.362L9.522 11.5A10.562 10.562 0 0 1 4.5 6.478L6.04 5.22c.429-.35.576-.938.363-1.447l-1.25-3V.77Z"
        fill={props.color??"#374151"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h16v16H0V0Z" fill="#fff" />
      </ClipPath>
    </Defs>
  </Svg>
)

export default PhoneIcon
