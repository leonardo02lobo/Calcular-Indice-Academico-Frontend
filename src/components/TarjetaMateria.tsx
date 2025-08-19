import { View,Text,StyleSheet } from "react-native";

type TarjetaMateriaProps = {
    materia: string;
    unidadCredito: number;
    codigo: string;
};

export default function TarjetaMateria({ materia, unidadCredito, codigo }: TarjetaMateriaProps){
    return (
        <View style={styles.container}>
            <Text style={styles.textMateria}>{materia}</Text>
            <Text style={styles.textUnidadCredito}>Unidades de Crédito: {unidadCredito}</Text>
            <Text style={styles.textCodigo}>Código: {codigo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: 10,
        margin: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    textMateria: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textUnidadCredito: {
        fontSize: 16,
        color: '#555',
    },
    textCodigo: {
        fontSize: 14,
        color: '#888',
    }
});