import { getUsuarioLogueadoId } from "../utils/usuarioLogueado";

export const redirectSimpleResolverParam = async (data, navigationRef) => {
  if (!navigationRef.isReady()) {
    // eslint-disable-next-line no-undef
    setTimeout(() => redirectSimpleResolver(data, navigationRef), 250);
    return;
  }

  const idUsuarioLogueado = await getUsuarioLogueadoId();
  navigationRef.navigate(data.ruta, { id: idUsuarioLogueado });
};

export const redirectSimpleResolver = async (data, navigationRef) => {
  if (!navigationRef.isReady()) {
    // eslint-disable-next-line no-undef
    setTimeout(() => redirectSimpleResolver(data, navigationRef), 250);
    return;
  }

  const idUsuarioLogueado = await getUsuarioLogueadoId();
  navigationRef.navigate(data.ruta, idUsuarioLogueado);
};
