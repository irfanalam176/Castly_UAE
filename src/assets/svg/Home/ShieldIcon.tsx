import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const ShieldIcon = (props: SvgProps) => (
    <Svg
        width={10}
        height={10}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M8.332 5.416c0 2.083-1.458 3.124-3.191 3.728-.09.031-.19.03-.28-.004-1.736-.6-3.194-1.641-3.194-3.724V2.5a.417.417 0 0 1 .416-.417c.833 0 1.875-.5 2.6-1.133a.487.487 0 0 1 .633 0c.729.637 1.766 1.133 2.6 1.133a.417.417 0 0 1 .416.417v2.916Z"
                stroke="#15803D"
                strokeWidth={0.833}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path fill="#fff" d="M0 0h9.998v9.998H0z" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default ShieldIcon
