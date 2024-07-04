import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'

const obtenerTokenDeNotificaciones = async () => {
    let token;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
    }
    
    token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId
    })).data;

    habilitarNotificacionesForeground()

    return token;
}

// Notificaciones foreground es cuando te entra una notificacion mientras tenes la app abierta.
// Queremos que las notificaciones si se muestren en ese caso y por eso la habilitamos
const habilitarNotificacionesForeground = () => {
    // eslint-disable-next-line import/namespace
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true
        }),
      });
}

export const NotificacionesService = { obtenerTokenDeNotificaciones }