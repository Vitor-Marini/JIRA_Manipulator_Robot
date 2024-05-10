import React from 'react';
import Svg, { Path } from 'react-native-svg';

const SVGFlexArrow3 = ({ style, height = "800", width = "800" }) => (
    <Svg height={height} width={width} viewBox="0 0 180 200" style={style}>
        <Path 
            d="M77.518166,80.879l -2.511329.902194l2.456228 -7.391131l6.009837,4.05825 -2.797706,1.083002c2.429947,7.383275 -2.117923,16.023897 -11.976709,14.029125c7.017913 -.651767,10.949725 -7.068494,8.819679 -12.68144Z" 
            transform="matrix( -.107213 -1.004033 -.841934 0.089904 185.182103 91.763726)" 
            fill="#1a56e3" 
            stroke="#000" 
            strokeWidth="0.5"
        />
    </Svg>
);

export default SVGFlexArrow3;