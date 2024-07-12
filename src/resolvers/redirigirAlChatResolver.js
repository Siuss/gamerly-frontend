export const redirigirAlChatResolver = async (data, navigationRef) => {
  if (!navigationRef.isReady()) {
    // eslint-disable-next-line no-undef
    setTimeout(() => redirigirAlChatResolver(data, navigationRef), 250);
    return;
  }

  navigationRef.navigate(data.ruta, data.idChat);
};
