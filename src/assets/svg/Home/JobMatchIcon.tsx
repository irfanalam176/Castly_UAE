import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const JobMatchIcon = (props: SvgProps) => (
    <Svg
        width={17}
        height={19}
        fill="none"
        {...props}
    >
        <Path
            d="M1.669 10.83a.832.832 0 0 1-.65-1.357L9.265.977a.416.416 0 0 1 .716.383L8.382 6.374A.833.833 0 0 0 9.165 7.5h5.83a.833.833 0 0 1 .65 1.357L7.4 17.352a.417.417 0 0 1-.716-.383l1.6-5.014a.833.833 0 0 0-.784-1.125H1.67Z"
            fill="#F7FF36"
            stroke="#F7FF36"
            strokeWidth={1.666}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default JobMatchIcon
