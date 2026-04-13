import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const CalendarIcon = (props: SvgProps) => (
    <Svg
        width={12}
        height={12}
        fill="none"
        {...props}
    >
        <G
            clipPath="url(#a)"
            stroke="#9CA3AF"
            strokeWidth={0.999}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M3.998 1v1.998M7.996 1v1.998M9.495 1.999H2.499a1 1 0 0 0-1 1v6.996a1 1 0 0 0 1 1h6.996a1 1 0 0 0 1-1V2.998a1 1 0 0 0-1-1ZM1.5 4.997h8.994" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h11.994v11.994H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default CalendarIcon
