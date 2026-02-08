import * as React from "react"
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg"
const PressedBookmark = () => (
  <Svg
    width={22}
    height={27}
    viewBox="0 0 22 27"
    fill="none"
  >
    <Path
      d="M20.5439 26.3311C20.9293 26.1074 21.167 25.6953 21.167 25.25V3.91699C21.167 2.87793 20.754 1.88184 20.0195 1.14746C19.285 0.413086 18.2888 0 17.25 0H3.91699C2.87823 0 1.88197 0.413086 1.14746 1.14746C0.412949 1.88184 0 2.87793 0 3.91699V25.25C0 25.6953 0.237656 26.1074 0.623047 26.3311C1.00839 26.5547 1.48334 26.5557 1.87012 26.335L10.583 21.3555L19.2969 26.335C19.6837 26.5557 20.1586 26.5547 20.5439 26.3311Z"
      fill="url(#paint0_linear_144_556)"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_144_556"
        x1={33.0833}
        y1={-14.75}
        x2={19.1946}
        y2={35.4841}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.533061} stopColor="#7720E2" />
        <Stop offset={1} stopColor="#C787EE" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default PressedBookmark
