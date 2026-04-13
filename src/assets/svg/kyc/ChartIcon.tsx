import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const ChartIcon = (props: SvgProps) => (
  <Svg
    width={props.width??18}
    height={ props.height?? 16}
    viewBox="0 0 18 16"
    fill="none"

    {...props}
  >
    <Path
      d="M2.25 1.125a1.124 1.124 0 1 0-2.25 0v11.813a2.812 2.812 0 0 0 2.813 2.812h14.062c.622 0 1.125-.503 1.125-1.125s-.503-1.125-1.125-1.125H2.812a.564.564 0 0 1-.562-.563V1.126ZM16.544 4.17a1.127 1.127 0 0 0-1.592-1.593L11.25 6.282 9.232 4.264a1.127 1.127 0 0 0-1.593 0L3.702 8.202a1.127 1.127 0 0 0 1.593 1.593l3.143-3.14 2.018 2.018c.439.44 1.153.44 1.592 0l4.5-4.5-.003-.003Z"
      fill={props.color??"#4B5563"}
    />
  </Svg>
)

export default ChartIcon
