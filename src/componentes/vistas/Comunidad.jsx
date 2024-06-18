import { StyleSheet, ScrollView } from "react-native";
import { CardComunidad } from "../bloques/CardComunidad";
import { Color } from "../../estilos/colores";
import comunidades from "../../mocks/comunidadMock.json"

const datosEstáticos = comunidades;

export const Comunidad = () => {
  const [comunidades, setComunidades] = useState([]);

  useEffect(() => {
    const cargarComunidades = async () => {
      try {
        const datos = await obtenerComunidades();
        if (datos.length > 0) {
          setComunidades(datos);
        } else {
          // Aquí cargarías los datos estáticos de comunidades
          setComunidades(datosEstáticos);
        }
      } catch (error) {
        console.error('Error al cargar comunidades:', error);
        setComunidades(datosEstáticos);
      }
    };

    cargarComunidades();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {comunidades.map((comunidad) => <CardComunidad
        key={comunidad.juego}
        foto={comunidad.foto}
        juego={comunidad.juego}
        plataforma={comunidad.plataforma}
      />)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    backgroundColor: Color.neutro,
    padding: "8px",
  },
});
