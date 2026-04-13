import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const VerticalDots = (props: SvgProps) => (
  <Svg
    width={props.width ?? 4}
    height={props.height ?? 16}
    fill="none"
    {...props}
  >
    <Path
      d="M1.969 11.25a1.969 1.969 0 1 0 0 3.938 1.969 1.969 0 0 0 0-3.938Zm0-5.625a1.969 1.969 0 1 0 0 3.938 1.969 1.969 0 0 0 0-3.938Zm1.968-3.656a1.969 1.969 0 1 0-3.937 0 1.969 1.969 0 0 0 3.938 0Z"
      fill={props.color ?? '#374151'}
    />
  </Svg>
);

export default VerticalDots;
