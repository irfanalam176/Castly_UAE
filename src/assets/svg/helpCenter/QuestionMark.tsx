import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const QuestionMark = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24ZM7.96 7.748A2.63 2.63 0 0 1 10.433 6h2.733a2.958 2.958 0 0 1 2.958 2.958c0 1.06-.567 2.039-1.486 2.569l-1.514.867c-.01.61-.51 1.106-1.125 1.106a1.122 1.122 0 0 1-1.125-1.125v-.633c0-.403.216-.773.567-.975l2.077-1.19a.709.709 0 0 0-.352-1.322h-2.733a.37.37 0 0 0-.351.248l-.019.056c-.206.586-.853.891-1.434.685a1.129 1.129 0 0 1-.685-1.435l.02-.056-.006-.005ZM10.5 16.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
      fill="#4F46E5"
    />
  </Svg>
)

export default QuestionMark
