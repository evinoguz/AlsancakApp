import * as React from 'react';
import Svg, {Rect, Line} from 'react-native-svg';
export const List = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-sidebar"
    {...props}>
    <Rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
    <Line x1={9} y1={3} x2={9} y2={21} />
  </Svg>
);
