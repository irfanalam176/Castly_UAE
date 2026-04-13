import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { SvgIconProps } from "./type"

const BuildingIcon: React.FC<SvgIconProps> = ({
  width = 24,
  height = 24,
  fillColor = "#A8AEB9",
  ...props
}) => {
  return (
   <Svg
      width={18}
      height={24}
      viewBox="0 0 18 24"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1_4014)">
        <Path
          d="M2.25 0A2.25 2.25 0 000 2.25v19.5A2.25 2.25 0 002.25 24h4.5v-3.75a2.25 2.25 0 014.5 0V24h4.5A2.25 2.25 0 0018 21.75V2.25A2.25 2.25 0 0015.75 0H2.25zM3 11.25c0-.412.337-.75.75-.75h1.5c.412 0 .75.338.75.75v1.5c0 .412-.338.75-.75.75h-1.5a.752.752 0 01-.75-.75v-1.5zm5.25-.75h1.5c.412 0 .75.338.75.75v1.5c0 .412-.338.75-.75.75h-1.5a.752.752 0 01-.75-.75v-1.5c0-.412.338-.75.75-.75zm3.75.75c0-.412.338-.75.75-.75h1.5c.412 0 .75.338.75.75v1.5c0 .412-.338.75-.75.75h-1.5a.752.752 0 01-.75-.75v-1.5zM3.75 4.5h1.5c.412 0 .75.338.75.75v1.5c0 .412-.338.75-.75.75h-1.5A.752.752 0 013 6.75v-1.5c0-.412.337-.75.75-.75zm3.75.75c0-.412.338-.75.75-.75h1.5c.412 0 .75.338.75.75v1.5c0 .412-.338.75-.75.75h-1.5a.752.752 0 01-.75-.75v-1.5zm5.25-.75h1.5c.412 0 .75.338.75.75v1.5c0 .412-.338.75-.75.75h-1.5a.752.752 0 01-.75-.75v-1.5c0-.412.338-.75.75-.75z"
          fill="#4B5563"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_4014">
          <Path d="M0 0h18v24H0V0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default BuildingIcon
