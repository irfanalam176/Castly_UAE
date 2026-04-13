import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const GlobeIcon = (props: SvgProps) => (
    <Svg
        width={ props.width || 13}
        height={ props.height || 13}
        viewBox="0 0 13 13"
        fill="none"
        {...props}
    >
        <G
            clipPath="url(#a)"
            stroke={props.color || "#9CA3AF"}
            strokeWidth={1.082}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M6.495 11.907a5.412 5.412 0 1 0 0-10.825 5.412 5.412 0 0 0 0 10.825Z" />
            <Path d="M6.494 1.082a7.848 7.848 0 0 0 0 10.825 7.848 7.848 0 0 0 0-10.825ZM1.083 6.495h10.824" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h12.989v12.989H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default GlobeIcon
