import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const BackIcon = (props: SvgProps) => (
    <Svg
        width={ props.width??16}
        height={ props.height?? 18}
        viewBox="0 0 16 18"
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M.33 8.205c-.439.44-.439 1.154 0 1.593l5.626 5.625a1.127 1.127 0 0 0 1.592-1.592L3.84 10.125h10.786a1.124 1.124 0 1 0 0-2.25H3.843L7.545 4.17a1.127 1.127 0 0 0-1.593-1.593L.327 8.202l.004.003Z"
                fill={props.color ?? '#4B5563'}
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path d="M0 0h15.75v18H0V0Z" fill="#fff" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default BackIcon
