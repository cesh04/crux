import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

type Props = {
  color?: string;
}

const UnpressedTick = ({ color = "white" }: Props) => (
  <Svg
    width={39}
    height={39}
    viewBox="0 0 39 39"
    fill="none"
  >
    <Path
      d="M12 20.8333L17 25.5L27 15.5"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={19.5} cy={19.5} r={17.5} stroke={color} strokeWidth={2.5} />
  </Svg>
)
export default UnpressedTick