import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const SliderHorizontalIcon = (props: SvgProps) => (
    <Svg
        width={13}
        height={13}
        fill="none"
        {...props}
    >
        <G
            clipPath="url(#a)"
            stroke="#000"
            strokeWidth={1.082}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M11.366 2.165H7.577M5.412 2.165H1.624M11.365 6.495h-4.87M4.33 6.495H1.624M11.366 10.824H8.659M6.495 10.824H1.624M7.577 1.082v2.165M4.33 5.412v2.165M8.66 9.742v2.165" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h12.989v12.989H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default SliderHorizontalIcon
