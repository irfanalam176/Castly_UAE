import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg"

function CashIcon(props:SvgProps) {
  return (
    <Svg
      width={16}
      height={14}
      viewBox="0 0 16 14"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1_3898)">
        <G clipPath="url(#clip1_1_3898)">
          <Path
            d="M0 3.076v8.471c0 .492.276.957.738 1.13 2.38.888 4.758.281 7.137-.326 2.182-.555 4.364-1.113 6.543-.517.63.173 1.332-.26 1.332-.913V2.453c0-.492-.276-.957-.738-1.13-2.38-.888-4.758-.281-7.137.326-2.182.555-4.364 1.11-6.543.514C.7 1.991 0 2.423 0 3.076zm7.875 6.55C6.666 9.625 5.687 8.448 5.687 7c0-1.45.98-2.625 2.188-2.625 1.209 0 2.188 1.176 2.188 2.625 0 1.45-.98 2.625-2.188 2.625zm-6.125 0c.965 0 1.75.784 1.75 1.75H1.75v-1.75zM3.5 3.937c0 .965-.785 1.75-1.75 1.75v-1.75H3.5zM14 8.313v1.75h-1.75c0-.966.785-1.75 1.75-1.75zm-1.75-5.688H14v1.75c-.965 0-1.75-.785-1.75-1.75z"
            fill={props.color??"#16A34A"}
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_1_3898">
          <Path fill="#fff" d="M0 0H15.75V14H0z" />
        </ClipPath>
        <ClipPath id="clip1_1_3898">
          <Path d="M0 0h15.75v14H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default CashIcon
