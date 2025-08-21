import { StyleSheet, View, Text, ScrollView, Button, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import TarjetaMateria from "../components/TarjetaMateria";
import ObtenerIndiceAcademico from "../script/ObtenerIndiceAcademico";
import materiasData from "../data/materias.json";

export default function Home() {
  const [carrera, setCarrera] = useState<string | null>(null);
  const [materias, setMaterias] = useState<any[]>([]);
  const [notasSeleccionadas, setNotasSeleccionadas] = useState<{ [codigo: string]: { nota: number; UC: number } }>({});
  const [indice, setIndice] = useState<number>(0);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const storedCarrera = await AsyncStorage.getItem("@carrera");
        const storedNotas = await AsyncStorage.getItem("@notas");
        
        if (storedCarrera) {
          setCarrera(storedCarrera);
          setMaterias(materiasData[storedCarrera] || []);
        }
        if (storedNotas) {
          setNotasSeleccionadas(JSON.parse(storedNotas));
        }
      } catch (error) {
        console.error("Error cargando datos locales:", error);
      }
    };

    cargarDatos();
  }, []);

  const seleccionarCarrera = async (value: string) => {
    setCarrera(value);
    setMaterias(materiasData[value] || []);
    await AsyncStorage.setItem("@carrera", value);
  };

  const handleChangeNota = (codigo: string, nota: number, UC: number) => {
    setNotasSeleccionadas((prev) => {
      const updated = { ...prev, [codigo]: { nota, UC } };
      AsyncStorage.setItem("@notas", JSON.stringify(updated));
      return updated;
    });
  };

  const calcularIndice = () => {
    console.log(materias, notasSeleccionadas);
    const indiceAcademico = ObtenerIndiceAcademico(notasSeleccionadas);
    console.log("Índice académico calculado:", indiceAcademico);
    setIndice(indiceAcademico);
    Alert.alert("Índice calculado", `Tu índice académico es: ${indiceAcademico.toFixed(3)}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Índice Académico</Text>
        <Dropdown
          style={styles.dropdown}
          data={Object.keys(materiasData).map((carrera) => ({ label: carrera, value: carrera }))}
          labelField="label"
          valueField="value"
          placeholder="Selecciona tu carrera"
          value={carrera}
          onChange={(item) => seleccionarCarrera(item.value)}
        />
      </View>

      <ScrollView style={styles.container}>
        {materias.map((materia) => (
          <TarjetaMateria
            key={materia.Codigo}
            materia={materia.nombre}
            unidadCredito={materia.UC}
            codigo={materia.Codigo}
            notaFinal={notasSeleccionadas[materia.Codigo]?.nota ?? 0}
            onChangeNota={handleChangeNota}
          />
        ))}
      </ScrollView>

      <Button title="Calcular Índice" onPress={calcularIndice} />
      <Text style={styles.textIndice}>Índice actual: {indice.toFixed(3)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10,backgroundColor: "#f0f0f0" },
  header: { marginBottom: 15 },
  textHeader: { fontSize: 24, fontWeight: "bold", color: "black" },
  dropdown: { marginVertical: 10, borderWidth: 1, borderRadius: 8, padding: 8 },
  textIndice: { marginTop: 10, fontSize: 18, fontWeight: "bold" }
});
