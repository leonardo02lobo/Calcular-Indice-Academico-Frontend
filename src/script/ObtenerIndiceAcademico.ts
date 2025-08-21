export default function ObtenerIndiceAcademico(notasSeleccionadas: { [codigo: string]: { nota: number; UC: number } }) {
    let sumaNotas = 0;
    let sumaCreditos = 0;

    Object.entries(notasSeleccionadas).forEach(([codigo, materia]) => {
        const UC = materia.UC;
        const nota = materia.nota;

        sumaNotas += nota * UC;
        if (nota > 0) {
            sumaCreditos += UC;
        }
    });

    if (sumaCreditos === 0) {
        return 0;
    }

    return parseFloat((sumaNotas / sumaCreditos).toFixed(3));
}