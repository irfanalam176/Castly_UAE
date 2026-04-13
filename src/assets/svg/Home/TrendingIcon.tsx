import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const TrendingIcon = (props: SvgProps) => (
    <Svg
        width={12}
        height={12}
        fill="none"
        {...props}
    >
        <G
            clipPath="url(#a)"
            stroke="#FB923C"
            strokeWidth={0.999}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <Path d="M10.99 3.497 6.744 7.743 4.246 5.245.999 8.492" />
            <Path d="M7.993 3.497h2.997v2.997" />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h11.989v11.989H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default TrendingIcon
