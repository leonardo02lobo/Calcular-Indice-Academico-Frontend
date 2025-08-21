import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

type TarjetaMateriaProps = {
  materia: string;
  unidadCredito: number;
  codigo: string;
  notaFinal:number;
  onChangeNota: (codigo: string, nota: number,UC:number) => void;
};

export default function TarjetaMateria({
  materia,
  unidadCredito,
  codigo,
  notaFinal,
  onChangeNota,
}: TarjetaMateriaProps) {
  const [nota, setNota] = useState<string | null>(null);

  const notas = Array.from({ length: 10 }, (_, i) => ({
    label: (i).toString(),
    value: (i).toString(),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.textMateria}>{materia}</Text>
        <Text style={styles.textUnidadCredito}>
          Créditos: {unidadCredito}
        </Text>
        <Text style={styles.textCodigo}>Código: {codigo}</Text>
      </View>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={notas}
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder="Nota"
        value={notaFinal? notaFinal.toString() : nota}
        onChange={(item) => {
          setNota(item.value);
          onChangeNota(codigo, parseInt(item.value),unidadCredito);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    padding: 12,
    marginVertical: 6,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
    paddingRight: 10,
  },
  textMateria: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  textUnidadCredito: {
    fontSize: 14,
    color: "#444",
    marginTop: 2,
  },
  textCodigo: {
    fontSize: 13,
    color: "#666",
    marginTop: 1,
  },
  dropdown: {
    width: 70,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#f9f9f9",
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
});
