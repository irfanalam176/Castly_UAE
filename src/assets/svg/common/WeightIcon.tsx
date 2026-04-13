import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const WeightIcon = (props: SvgProps) => (
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
      <Path d="M6.992 4.662a1.748 1.748 0 1 0 0-3.497 1.748 1.748 0 0 0 0 3.497ZM3.787 4.662a1.165 1.165 0 0 0-1.11.85L1.224 10.78a1.166 1.166 0 0 0 1.107 1.457h9.323a1.166 1.166 0 0 0 1.122-1.48l-1.472-5.221a1.166 1.166 0 0 0-1.119-.874H3.787Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13.985v13.985H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default WeightIcon;
