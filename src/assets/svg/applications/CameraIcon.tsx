import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CameraIcon = (props: SvgProps) => (
  <Svg
    width={props.width??14}
    height={props.height??14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path
      d="m4.077 1.772-.284.853H1.75C.785 2.625 0 3.41 0 4.375v7c0 .965.785 1.75 1.75 1.75h10.5c.965 0 1.75-.785 1.75-1.75v-7c0-.965-.785-1.75-1.75-1.75h-2.043l-.284-.853A1.309 1.309 0 0 0 8.68.875H5.32c-.566 0-1.066.36-1.244.897ZM7 5.25a2.625 2.625 0 1 1 0 5.25 2.625 2.625 0 0 1 0-5.25Z"
      fill={props.color??"#2563EB"}
    />
  </Svg>
)

export default CameraIcon
