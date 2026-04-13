import * as React from "react"
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg"

const FileIcon = (props: SvgProps) => (
    <Svg
        width={ props.width?? 15}
        height={ props.height?? 20}
        viewBox="0 0 15 20"
        fill="none"
        {...props}
    >
        <G clipPath="url(#a)">
            <Path
                d="M2.5 0A2.502 2.502 0 0 0 0 2.5v15C0 18.879 1.121 20 2.5 20h10c1.379 0 2.5-1.121 2.5-2.5V6.25h-5c-.691 0-1.25-.559-1.25-1.25V0H2.5ZM10 0v5h5l-5-5ZM4.375 10h6.25c.344 0 .625.281.625.625a.627.627 0 0 1-.625.625h-6.25a.627.627 0 0 1-.625-.625c0-.344.281-.625.625-.625Zm0 2.5h6.25c.344 0 .625.281.625.625a.627.627 0 0 1-.625.625h-6.25a.627.627 0 0 1-.625-.625c0-.344.281-.625.625-.625Zm0 2.5h6.25c.344 0 .625.281.625.625a.627.627 0 0 1-.625.625h-6.25a.627.627 0 0 1-.625-.625c0-.344.281-.625.625-.625Z"
                fill={props.color??"#4B5563"}
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path d="M0 0h15v20H0V0Z" fill="#fff" />
            </ClipPath>
        </Defs>
    </Svg>
)

export default FileIcon
