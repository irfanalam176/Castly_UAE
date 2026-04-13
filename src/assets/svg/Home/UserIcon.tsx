import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const UserIcon = (props: SvgProps) => (
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
            <Path d="M7.996 10.494v-1a1.999 1.999 0 0 0-2-1.998H2.999A1.999 1.999 0 0 0 1 9.495v1M4.498 5.497a1.999 1.999 0 1 0 0-3.998 1.999 1.999 0 0 0 0 3.998ZM10.994 10.494v-1a1.998 1.998 0 0 0-1.499-1.933M7.996 1.564a1.999 1.999 0 0 1 0 3.873" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h11.994v11.994H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default UserIcon
