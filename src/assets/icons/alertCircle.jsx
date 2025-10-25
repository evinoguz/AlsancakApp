import * as React from "react";
import Svg, { Circle, Line } from "react-native-svg";
export const AlertCircle = (props) => (
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
    className="feather feather-alert-circle"
    {...props}
  >
    <Circle cx={12} cy={12} r={10} />
    <Line x1={12} y1={8} x2={12} y2={12} />
    <Line x1={12} y1={16} x2={12.01} y2={16} />
  </Svg>
);
