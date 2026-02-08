import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
}

const UnpressedBookmark = ({ color = "white" }: Props) => (
  <Svg
    width={22}
    height={28}
    viewBox="0 0 22 28"
    fill="none"
  >
    <Path
      d="M20.3333 26L11 20.6667L1.66666 26V4.66667C1.66666 3.95942 1.94761 3.28115 2.4477 2.78105C2.9478 2.28095 3.62608 2 4.33332 2H17.6667C18.3739 2 19.0522 2.28095 19.5523 2.78105C20.0524 3.28115 20.3333 3.95942 20.3333 4.66667V26Z"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
export default UnpressedBookmark
