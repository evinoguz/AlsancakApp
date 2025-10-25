import * as React from "react";
import Svg, { Line } from "react-native-svg";
export const Minus = (props) => (
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
    className="feather feather-minus"
    {...props}
  >
    <Line x1={5} y1={12} x2={19} y2={12} />
  </Svg>
);
