import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SearchIcon = (props: SvgProps) => (
  <Svg
    width={ props.width || 14}
    height={ props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <Path
      d="M6.41 11.072a4.662 4.662 0 1 0 0-9.324 4.662 4.662 0 0 0 0 9.324ZM12.237 12.237 9.732 9.732"
      stroke={props.color || "#9CA3AF"}
      strokeWidth={1.165}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SearchIcon
