import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const StarIcon = (props: SvgProps) => (
    <Svg
        width={12}
        height={12}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M5.757 1.146a.265.265 0 0 1 .475 0l1.154 2.338a1.06 1.06 0 0 0 .796.58l2.581.377a.265.265 0 0 1 .147.452L9.044 6.71a1.06 1.06 0 0 0-.306.938l.441 2.568a.265.265 0 0 1-.385.28L6.487 9.281a1.06 1.06 0 0 0-.986 0l-2.306 1.213a.264.264 0 0 1-.385-.28l.44-2.567a1.06 1.06 0 0 0-.305-.938L1.08 4.893a.265.265 0 0 1 .147-.453l2.58-.377a1.06 1.06 0 0 0 .798-.58l1.153-2.337Z"
                fill="#F7FF36"
                stroke="#F7FF36"
                strokeWidth={0.999}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h11.989v11.989H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default StarIcon
