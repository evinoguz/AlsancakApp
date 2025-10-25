import * as React from "react";
import Svg, { Path, Polyline, Line } from "react-native-svg";
export const Login = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-log-in"
    {...props}
  >
    <Path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    <Polyline points="10 17 15 12 10 7" />
    <Line x1={15} y1={12} x2={3} y2={12} />
  </Svg>
);