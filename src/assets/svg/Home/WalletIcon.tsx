import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const WalletIcon = (props: SvgProps) => (
    <Svg
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M2.5 1.25A2.502 2.502 0 0 0 0 3.75v12.5c0 1.379 1.121 2.5 2.5 2.5h15c1.379 0 2.5-1.121 2.5-2.5V7.5C20 6.121 18.879 5 17.5 5H3.125a.627.627 0 0 1-.625-.625c0-.344.281-.625.625-.625H17.5c.691 0 1.25-.559 1.25-1.25s-.559-1.25-1.25-1.25h-15Zm13.75 9.375a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
                fill="#4B5563"
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path d="M0 0h20v20H0V0Z" fill="#fff" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default WalletIcon
