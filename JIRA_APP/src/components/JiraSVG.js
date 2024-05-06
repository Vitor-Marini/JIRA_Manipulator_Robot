import React from 'react';
import Svg, { G, Rect, Ellipse, Path } from 'react-native-svg';

const JiraSVG = ({style, height="800", width="800"}) => (
/*     <Svg height="600" width="600" viewBox="0 0 300 300">
        <G transform="matrix(1 0 0 0.731092 0.000001 48.148319)">
            <Rect width="32.61108" height="35.872188" rx="0" ry="0" transform="matrix(1.77143 0 0 1.12987 30.26093 177.37954)" fill="#25272c" stroke="#353942" />
            <Ellipse rx="16.30554" ry="6.522216" transform="matrix(1.77143 0 0 1.142858 59.145053 217.91045)" fill="#25272c" stroke="#353942" />
            <Rect width="56.674974" height="7.45396" rx="0" ry="0" transform="matrix(.986326 0 0 2.437498 31.2 200.098955)" fill="#25272c" stroke-width="0" />
            <Ellipse rx="16.30554" ry="6.522216" transform="matrix(1.77143 0 0 1.142857 59.145053 177.37954)" fill="#282c37" stroke="#353942" />
        </G>
        <G transform="matrix(.999824-.018763 0.018763 0.999824-78.518082 26.256162)">
            <G transform="matrix(1.236793 0 0 1.334989-31.471666-52.906556)">
                <Path d="M50.78492,100.78974l13.0899-9.17998c1.80869-1.26844,4.3032-.83048,5.57163.97821l7.3626,10.49848h-27.60604c.22618-.89846.76383-1.723,1.5819-2.29671h.00001Z" transform="matrix(1.189627 0.005177-.005664 1.301635 59.400709 19.747011)" fill="#282c37" stroke="#353942" />
                <Path d="M50.78492,100.78974l13.0899-9.17998c1.80869-1.26844,4.3032-.83048,5.57163.97821l7.3626,10.49848h-27.60604c.22618-.89846.76383-1.723,1.5819-2.29671h.00001Z" transform="matrix(1.189627 0.005177-.005664 1.301635 61.209826 21.375863)" fill="#25272c" stroke="#353942" />
                <Rect width="2.53676" height="1.596884" rx="0.3" ry="0.3" transform="matrix(.761032 0.716516-.777223 0.82551 117.702725 153.417701)" fill="#353942" stroke-width="0" />
                <Rect width="1.708764" height="0.764931" rx="0" ry="0" transform="matrix(.482363-.875971 1.284076 0.707091 117.55 154.660609)" fill="#282c37" stroke-width="0" />
                <Rect width="0.750512" height="0.349601" rx="0" ry="0" transform="matrix(1.142204 0.891258-.615177 0.788389 117.72635 154.458786)" fill="#282c37" stroke-width="0" />
                <Rect width="0.750512" height="0.349601" rx="0" ry="0" transform="matrix(1.142204 0.891258-.615177 0.788389 118.715067 152.8)" fill="#282c37" stroke-width="0" />
            </G>
            <Ellipse rx="30" ry="30" transform="matrix(.295053 0 0 0.322543 138.14841 140.882826)" fill="#282c37" stroke="#353942" stroke-width="3" />
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406-.10529 0.891004 139.131953 73.409509)" fill="#282c37" stroke="#353942" />
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406-.10529 0.891004 140.190542 73.888834)" fill="#25272c" stroke="#353942" />
            <Ellipse rx="30" ry="30" transform="matrix(.32856 0 0 0.322543 139.19337 141.882826)" fill="#25272c" stroke="#353942" stroke-width="3" />
            <Ellipse rx="0.916346" ry="0.876506" transform="matrix(1 0 0 1.088383 139.374897 141.886233)" fill="#5e5f61" stroke-width="0" />
        </G>
        <G transform="matrix(.702906 0.711283-.711283 0.702906 73.787211-98.869274)">
            <Rect width="24.290774" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406-.028027 0.237172 138.267233 70.506833)" fill="#252323" stroke="#353942" />
            <Rect width="1.610587" height="3.80822" rx="0" ry="0" transform="matrix(3.023502 0.317149-.104322 0.994544 142.525145 85.882664)" fill="#252323" stroke-width="0" />
            <Ellipse rx="30" ry="30" transform="matrix(.295053 0 0 0.322543 138.14841 140.882826)" fill="#282c37" stroke="#353942" stroke-width="3" />
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406-.079715 0.674577 136.197294 88.084051)" fill="#282c37" stroke="#353942" />
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406-.028033 0.237227 138.373221 70.115051)" fill="#282c37" stroke="#353942" />
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406-.087414 0.739732 137.761069 88.306779)" fill="#25272c" stroke="#353942" />
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406-.028027 0.237172 139.781734 70.272469)" fill="#25272c" stroke="#353942" />
            <Ellipse rx="30" ry="30" transform="matrix(.313664 0 0 0.322543 139.851316 141.171543)" fill="#25272c" stroke="#353942" stroke-width="3" />
            <Ellipse rx="0.916346" ry="0.876506" transform="matrix(1 0 0 1.088383 140.117007 141.056916)" fill="#5e5f61" stroke-width="0" />
            <Path d="M69.788438,86.901772l-1.025853.491147.159999.199999l1.749399-.691147-.883546-.000001" transform="matrix(.734553-.678551 0.678551 0.734553 20.742799 119.483261)" fill="#282c37" stroke-width="0.6" />
        </G>
    </Svg> */
    <Svg height={height} width={width} viewBox="0 0 300 300" style={style}>
        <G transform="matrix(1 0 0 0.731092 47.088235 70.847819)">
            <Rect width="32.61108" height="35.872188" rx="0" ry="0" transform="matrix(1.77143 0 0 1.12987 30.26093 177.37954)" fill="#0d0d0e" stroke="#747577"/>
            <Ellipse rx="16.30554" ry="6.522216" transform="matrix(1.77143 0 0 1.142858 59.145053 217.91045)" fill="#0d0d0e" stroke="#747577"/>
            <Rect width="56.674974" height="7.45396" rx="0" ry="0" transform="matrix(.986326 0 0 2.437498 31.2 200.098955)" fill="#0d0d0e" stroke-width="0"/>
            <Ellipse rx="16.30554" ry="6.522216" transform="matrix(1.77143 0 0 1.142857 59.145053 177.37954)" fill="#19191c" stroke="#747577"/>
        </G>
        <G transform="matrix(.999996 -.0029 0.0029 0.999996 -29.677531 46.801417)">
            <G transform="matrix(1.236793 0 0 1.334989 -31.471666 -52.906556)">
                <Path d="M50.78492,100.78974l13.0899 -9.17998c1.80869 -1.26844,4.3032 -.83048,5.57163.97821l7.3626,10.49848h -27.60604c.22618 -.89846.76383 -1.723,1.5819 -2.29671h.00001Z" transform="matrix(1.189627 0.005177 -.005664 1.301635 59.400709 19.747011)" fill="#19191c" stroke="#747577"/>
                <Path d="M50.78492,100.78974l13.0899 -9.17998c1.80869 -1.26844,4.3032 -.83048,5.57163.97821c3.617809,5.139578,7.456917,8.760943,6.254845,10.19455.074292.198923 -12.937497.306049 -26.498285.30393.22618 -.89846.76383 -1.723,1.5819 -2.29671h.00001Z" transform="matrix(1.189627 0.005177 -.005664 1.301635 61.209826 21.375863)" fill="#0d0d0e" stroke="#747577"/>
                <Rect width="2.53676" height="1.596884" rx="0.3" ry="0.3" transform="matrix(.761032 0.716516 -.777223 0.82551 117.702725 153.417701)" fill="#747577" stroke-width="0"/>
                <Rect width="1.708764" height="0.764931" rx="0" ry="0" transform="matrix(.482363 -.875971 1.284076 0.707091 117.55 154.660609)" fill="#19191c" stroke-width="0"/>
                <Rect width="0.750512" height="0.349601" rx="0" ry="0" transform="matrix(1.142204 0.891258 -.615177 0.788389 117.72635 154.458786)" fill="#19191c" stroke-width="0"/>
                <Rect width="0.750512" height="0.349601" rx="0" ry="0" transform="matrix(1.142204 0.891258 -.615177 0.788389 118.715067 152.8)" fill="#19191c" stroke-width="0"/>
            </G>
            <Ellipse rx="30" ry="30" transform="matrix(.295053 0 0 0.322543 138.14841 140.882826)" fill="#282c37" stroke="#747577" stroke-width="3"/>
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406 -.10529 0.891004 139.131953 73.409509)" fill="#19191c" stroke="#747577"/>
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406 -.10529 0.891004 140.190542 73.888834)" fill="#0d0d0e" stroke="#747577"/>
            <Ellipse rx="30" ry="30" transform="matrix(.32856 0 0 0.322543 139.19337 141.882826)" fill="#0d0d0e" stroke="#747577" stroke-width="3"/>
            <Ellipse rx="0.916346" ry="0.876506" transform="matrix(1 0 0 1.088383 139.374897 141.886233)" fill="#cacaca" stroke-width="0"/>
        </G>
        <G transform="matrix(.702906 0.711283 -.711283 0.702906 120.875446 -76.169774)">
            <Rect width="25.473643" height="71.69484" rx="0" ry="0" transform="matrix(.625709 0.07394 -.028027 0.237172 138.415324 69.990644)" fill="#080809" stroke="#747577"/>
            <Path d="M117.735309,70.527336c.403221,0,.809518,1.38671.809518,1.38671l -.836308 -.062925 -1.113692 -1.502936.877217.173823" transform="matrix(.68837 -.72536 0.72536 0.68837 19.649121 124.735663)" fill="#080809" stroke-width="0.6"/>
            <Rect width="1.610587" height="3.80822" rx="0" ry="0" transform="matrix(3.023502 0.317149 -.104322 0.994544 142.525145 85.882664)" fill="#080809" stroke="#4a4c50" stroke-width="0.1"/>
            <Ellipse rx="30" ry="30" transform="matrix(.295053 0 0 0.322543 138.14841 140.882826)" fill="#19191c" stroke="#747577" stroke-width="3"/>
            <Rect width="22.129205" height="69.339041" rx="0" ry="0" transform="matrix(-.688885 -.081413 0.079722 -.674577 145.744546 138.251409)" fill="#19191c" stroke="#747577"/>
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406 -.028033 0.237227 138.560972 69.131928)" fill="#19191c" stroke="#747577"/>
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406 -.087414 0.739732 137.761069 88.306779)" fill="#0d0d0e" stroke="#747577"/>
            <Rect width="1.2" height="0.7" rx="0" ry="0" transform="matrix(.11841 -.940646 0.99217 0.124896 136.851595 86.584458)" fill="#19191c" stroke-width="0"/>
            <Rect width="1.216915" height="0.816065" rx="0" ry="0" transform="matrix(.128292 -1.019145 0.851058 0.107133 136.065547 87.103826)" fill="#747577" stroke-width="0"/>
            <Rect width="1.2" height="0.408308" rx="0" ry="0" transform="matrix(.773626 -.633642 0.633642 0.773626 152.333123 88.729471)" fill="#747577" stroke-width="0"/>
            <Rect width="1.220026" height="0.5" rx="0.1" ry="0.1" transform="matrix(.982865 -.805021 0.633642 0.773626 136.47847 86.864647)" fill="#747577" stroke-width="0"/>
            <Rect width="0.802242" height="0.5" rx="0" ry="0" transform="matrix(-2.121525 1.737646 0.633642 0.773626 137.449881 87.898342)" fill="#747577" stroke-width="0"/>
            <Rect width="22.129205" height="71.69484" rx="0" ry="0" transform="matrix(.688886 0.081406 -.028027 0.237172 139.954622 69.311262)" fill="#0d0d0e" stroke="#747577"/>
            <Ellipse rx="30" ry="30" transform="matrix(.313664 0 0 0.322543 139.851316 141.171543)" fill="#0d0d0e" stroke="#747577" stroke-width="3"/>
            <Ellipse rx="0.916346" ry="0.876506" transform="matrix(1 0 0 1.088383 139.851316 141.171543)" fill="#cacaca" stroke-width="0"/>
            <Path d="M69.788438,86.901772l -1.025853.491147.159999.199999l1.749399 -.691147 -.883546 -.000001" transform="matrix(.734553 -.678551 0.678551 0.734553 20.742799 119.483261)" fill="#19191c" stroke-width="0.6"/>
            <Path d="M107.473059,61.062606l -1.779936,1.328027 -1.328901.019075c0,0,1.683133 -1.547778,1.81908 -1.4706l1.289757.123498Z" transform="matrix(.713044 -.701119 0.701119 0.713044 18.008522 120.286749)" fill="#19191c" stroke-width="0.6"/>
        </G>
    </Svg>
);

export default JiraSVG;