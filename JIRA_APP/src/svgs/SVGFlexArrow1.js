import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SVGFlexArrow1 = ({ style, height = "800", width = "800" }) => (
    <Svg height={height} width={width} viewBox="0 0 180 200" style={style}>
        <Path 
            d="M77.508346,81.084629l -2.878124.801018l3.209442 -6.897269l5.73248,4.681389 -2.94.76c1.449724,5.719556 -4.577035,15.138638 -12.729923,14.78999c6.550024 -2.24192,11.149844 -10.514854,9.606125 -14.135128Z" 
            transform="matrix(.892684 -.450682 0.450682 0.892684 -40.275425 95.734289)" 
            fill="#1a56e3" 
            stroke="#000" 
            strokeWidth="0.5"
        />
    </Svg>
);

export default SVGFlexArrow1;