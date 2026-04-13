import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const InstaIcon = (props: SvgProps) => (
    <Svg
        width={13}
        height={13}
        fill="none"
        {...props}
    >
        <G
            clipPath="url(#a)"
            stroke="#9CA3AF"
            strokeWidth={1.082}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M9.2 1.082H3.79A2.706 2.706 0 0 0 1.083 3.79V9.2a2.706 2.706 0 0 0 2.706 2.706H9.2A2.706 2.706 0 0 0 11.907 9.2V3.788A2.706 2.706 0 0 0 9.2 1.083Z" />
            <Path d="M8.66 6.154a2.165 2.165 0 1 1-4.283.635 2.165 2.165 0 0 1 4.282-.635ZM9.471 3.518h.006" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h12.989v12.989H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default InstaIcon
