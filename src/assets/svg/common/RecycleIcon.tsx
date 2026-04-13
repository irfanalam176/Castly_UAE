import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const RecycleIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 14}
    height={ props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path
      d="M1.748 6.993a5.245 5.245 0 0 1 5.245-5.245 5.682 5.682 0 0 1 3.927 1.597l1.317 1.317"
      stroke={props.color || "#F7FF36"}
      strokeWidth={1.165}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.237 1.748v2.914H9.324M12.237 6.993a5.245 5.245 0 0 1-5.244 5.244 5.681 5.681 0 0 1-3.928-1.596L1.748 9.324"
      stroke={props.color || "#F7FF36"}
      strokeWidth={1.165}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.662 9.324H1.748v2.913"
      stroke={props.color || "#F7FF36"}
      strokeWidth={1.165}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default RecycleIcon
