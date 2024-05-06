import { Alert, StyleSheet, View } from "react-native";
import CustomButton from "../components/CustomButton";
import Svg, { G, Rect, Ellipse, Path } from 'react-native-svg';
import JiraSVG from "../components/JiraSVG";

export default function Config() {
    return (
        <View style={styles.container}>
{/*             <Svg height="600" width="600" viewBox="0 0 300 300">
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
            </Svg> */}
            <JiraSVG/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#001139", //01184D
        alignItems: "center",
        justifyContent: "center",
    },
});
