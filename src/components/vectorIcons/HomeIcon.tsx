import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { SvgIconProps } from "./type"

const HomeIcon:React.FC<SvgIconProps>=({
    width = 24, 
  height = 24,
  fillColor = '#FFFFFF', 
  ...props 
}) =>{
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 23 20"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1_3401)">
        <Path
          d="M22.492 9.98c0 .704-.586 1.254-1.25 1.254h-1.25l.027 6.258c0 .106-.007.211-.019.317v.628c0 .864-.7 1.563-1.563 1.563h-.625c-.043 0-.085 0-.128-.004-.055.004-.11.004-.165.004h-2.207c-.863 0-1.562-.7-1.562-1.563V15c0-.691-.559-1.25-1.25-1.25H10c-.691 0-1.25.559-1.25 1.25V18.438C8.75 19.3 8.05 20 7.187 20H5.005c-.059 0-.117-.004-.176-.008-.047.004-.094.008-.14.008h-.625c-.864 0-1.563-.7-1.563-1.563v-4.375c0-.035 0-.074.004-.109v-2.719H1.25C.547 11.234 0 10.688 0 9.98c0-.351.117-.664.39-.937L10.407.313c.274-.274.586-.313.86-.313.273 0 .586.078.82.273l9.976 8.77c.313.273.47.586.43.937z"
          fill={fillColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_3401">
          <Path d="M0 0h22.5v20H0V0z" fill={fillColor} />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default HomeIcon
