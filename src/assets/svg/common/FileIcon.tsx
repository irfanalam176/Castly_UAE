import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const FileIcon = (props: SvgProps) => (
  <Svg
    width={props.width || 14}
    height={props.height || 14}
    viewBox="0 0 14 14"
    fill="none"
    {...props}
  >
    <G
      clipPath="url(#a)"
      stroke={props.color || '#9CA3AF'}
      strokeWidth={1.165}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M8.74 1.165H3.497a1.165 1.165 0 0 0-1.165 1.166v9.323a1.166 1.166 0 0 0 1.165 1.165h6.993a1.166 1.166 0 0 0 1.165-1.165V4.079L8.741 1.165Z" />
      <Path d="M8.158 1.165v2.331a1.165 1.165 0 0 0 1.165 1.166h2.33M5.827 5.244H4.662M9.323 7.575H4.662M9.323 9.906H4.662" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13.985v13.985H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default FileIcon;
