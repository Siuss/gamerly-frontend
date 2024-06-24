import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUsuarioLogueado = async () => JSON.parse((await AsyncStorage.getItem("usuario")))
export const getUsuarioLogueadoId = async () => getUsuarioLogueado().id
