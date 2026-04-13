import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const AwardIcon = (props: SvgProps) => (
    <Svg
        width={9}
        height={13}
        fill="none"
        {...props}
    >
        <Path
            d="m5.78 6.827.566 3.184a.187.187 0 0 1-.303.175L4.706 9.183a.373.373 0 0 0-.447 0L2.92 10.186a.186.186 0 0 1-.287-.065.187.187 0 0 1-.015-.11l.565-3.184"
            stroke="#9CA3AF"
            strokeWidth={0.747}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M4.481 7.241a2.24 2.24 0 1 0 0-4.48 2.24 2.24 0 0 0 0 4.48Z"
            stroke="#9CA3AF"
            strokeWidth={0.747}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export default AwardIcon
