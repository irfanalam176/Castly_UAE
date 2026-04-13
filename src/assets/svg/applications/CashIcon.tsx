import * as React from 'react';
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg';

const CashIcon = (props: SvgProps) => (
  <Svg
    width={props.width ?? 16}
    height={props.height ?? 14}
    viewBox="0 0 15.75 14"
    fill="none"
    {...props}
  >
    <G clipPath="url(#clip)">
      <Path
        d="M0 3.076v8.471c0 .492.276.957.738 1.13 2.38.888 4.758.281 7.137-.326 2.182-.555 4.364-1.113 6.543-.517.63.173 1.332-.26 1.332-.913V2.453c0-.492-.276-.957-.738-1.13-2.38-.888-4.758-.281-7.137.326-2.182.555-4.364 1.11-6.543.514C.7 1.991 0 2.423 0 3.076Zm7.875 6.55C6.666 9.625 5.687 8.448 5.687 7c0-1.45.98-2.625 2.188-2.625 1.209 0 2.188 1.176 2.188 2.625 0 1.45-.98 2.625-2.188 2.625Zm-6.125 0c.965 0 1.75.784 1.75 1.75H1.75v-1.75ZM3.5 3.937c0 .965-.785 1.75-1.75 1.75v-1.75H3.5ZM14 8.313v1.75h-1.75c0-.966.785-1.75 1.75-1.75Zm-1.75-5.688H14v1.75c-.965 0-1.75-.785-1.75-1.75Z"
        fill={props.color ?? '#4B5563'}
      />
    </G>
    <Defs>
      <ClipPath id="clip">
        <Path d="M0 0h15.75v14H0V0Z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default CashIcon;
