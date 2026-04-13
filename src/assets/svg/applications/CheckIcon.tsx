import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

const CheckIcon = (props: SvgProps) => (
  <Svg
    width={props.width ?? 11}
    height={props.height ?? 12}
    viewBox="0 0 10.5 12"
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="M10.28 2.47a.751.751 0 0 1 0 1.062l-6 6a.751.751 0 0 1-1.062 0l-3-3A.751.751 0 0 1 1.279 5.47l2.47 2.468L9.22 2.47a.751.751 0 0 1 1.062 0h-.002Z"
        fill={props.color ?? "#fff"}
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path d="M0 0h10.5v12H0V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default CheckIcon;
