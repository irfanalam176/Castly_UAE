import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const EmailIcon = (props: SvgProps) => (
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
      <Path d="M11.654 2.33H2.33c-.644 0-1.166.523-1.166 1.166v6.993c0 .643.522 1.165 1.166 1.165h9.323c.643 0 1.165-.522 1.165-1.165V3.496c0-.643-.522-1.165-1.165-1.165Z" />
      <Path d="M12.82 4.079 7.591 7.4a1.13 1.13 0 0 1-1.2 0L1.165 4.08" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h13.985v13.985H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default EmailIcon;
