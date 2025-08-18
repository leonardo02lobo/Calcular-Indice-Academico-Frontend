import { View,StyleSheet } from "react-native";
import {Slot} from 'expo-router'

export default function Layout() {
    return (
        <View style={styles.container}>
            <Slot/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        "display": "flex",
        "flex": 1,
        "justifyContent": "center",
        "alignContent": "center"
    }
})