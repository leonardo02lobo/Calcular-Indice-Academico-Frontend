import { StyleSheet, View,Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TarjetaMateria from "./TarjetaMateria";

export default function Home() {
    const Usuario = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).nombreUsuario : 'Usuario Desconocido';
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <Text style={styles.textHeader}>Hola {Usuario}</Text>
            </View>
            <ScrollView>
                <View style={styles.containerTable}>
                    <Text style={styles.textTable}>Materia</Text>
                    <Text style={styles.textTable}>Unidades de Crédito</Text>
                    <Text style={styles.textTable}>Código</Text>
                    <Text style={styles.textTable}>Nota</Text>
                </View>
                <TarjetaMateria materia="Matemáticas" unidadCredito={4} codigo="MAT101" />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    containerHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 5,
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
    },
    textHeader: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
    },
    containerTable:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '100%',
        backgroundColor: '#e0e0e0',
    },
    textTable: {
        fontSize: 14,
        fontWeight: 'bold',
    }
})