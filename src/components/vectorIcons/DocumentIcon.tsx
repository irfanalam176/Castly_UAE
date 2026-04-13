import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { SvgIconProps } from "./type"

const DocumentIcon: React.FC<SvgIconProps> = ({
  width = 15,
  height = 20,
  fillColor = "#4B5563",
  ...props
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 15 20"
      fill="none"
      {...props}
    >
      <G clipPath="url(#clip0_1_5021)">
        <Path
          d="M2.5 0A2.502 2.502 0 000 2.5v15C0 18.879 1.121 20 2.5 20h10c1.379 0 2.5-1.121 2.5-2.5V6.25h-5c-.691 0-1.25-.559-1.25-1.25V0H2.5zM10 0v5h5l-5-5zM4.375 10h6.25c.344 0 .625.281.625.625a.627.627 0 01-.625.625h-6.25a.627.627 0 01-.625-.625c0-.344.281-.625.625-.625zm0 2.5h6.25c.344 0 .625.281.625.625a.627.627 0 01-.625.625h-6.25a.627.627 0 01-.625-.625c0-.344.281-.625.625-.625zm0 2.5h6.25c.344 0 .625.281.625.625a.627.627 0 01-.625.625h-6.25a.627.627 0 01-.625-.625c0-.344.281-.625.625-.625z"
          fill={fillColor}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_5021">
          <Path d="M0 0h15v20H0V0z" fill={fillColor} />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default DocumentIcon
