import * as React from "react";
import Svg, { Polyline } from "react-native-svg";
export const ChevronUp = (props) => (
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
    className="feather feather-chevron-up"
    {...props}
  >
    <Polyline points="18 15 12 9 6 15" />
  </Svg>
);
