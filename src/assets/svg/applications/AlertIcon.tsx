import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const AlertIcon = (props: SvgProps) => (
    <Svg
        width={13}
        height={13}
        fill="none"
        {...props}
    >
        <G
            clipPath="url(#a)"
            stroke="#F59E0B"
            strokeWidth={1.008}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M6.047 11.533a5.039 5.039 0 1 0 0-10.077 5.039 5.039 0 0 0 0 10.077ZM6.046 4.48v2.015M6.046 8.51h.005" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h12.093v12.989H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default AlertIcon
