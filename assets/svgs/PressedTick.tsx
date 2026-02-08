import * as React from "react"
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg"
const PressedTick = () => (
  <Svg
    width={39}
    height={39}
    viewBox="0 0 39 39"
    fill="none"
  >
    <Path
      d="M19.5 38.25C29.8553 38.25 38.25 29.8553 38.25 19.5C38.25 9.14466 29.8553 0.75 19.5 0.75C9.14466 0.75 0.75 9.14466 0.75 19.5C0.75 29.8553 9.14466 38.25 19.5 38.25Z"
      fill="url(#paint0_linear_144_588)"
    />
    <Path
      d="M12 20.8333L17 25.5L27 15.5"
      stroke="white"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_144_588"
        x1={34.1761}
        y1={3.92207}
        x2={24.9381}
        y2={46.7744}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.533061} stopColor="#7720E2" />
        <Stop offset={1} stopColor="#C787EE" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default PressedTick
