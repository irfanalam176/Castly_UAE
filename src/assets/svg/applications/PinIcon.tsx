import * as React from 'react';
import Svg, { SvgProps, Path, G, Defs, ClipPath } from 'react-native-svg';

const PinIcon = (props: SvgProps) => (
  <Svg
    width={props.width ?? 9}
    height={props.height ?? 16}
    viewBox="0 0 9 16"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip)">
      <Path
        d="M5.055 13.2C6.258 11.695 9 8.048 9 6a4.501 4.501 0 0 0-9 0c0 2.048 2.742 5.695 3.945 7.2a.708.708 0 0 0 1.11 0ZM4.5 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
        fill={props.color ?? '#9CA3AF'}
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path d="M0 0h9v16H0V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default PinIcon;
