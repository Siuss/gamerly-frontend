import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants'
import { sendTokenService } from './sendTokenService';
import useStore from '../hooks/useStore'

const obtenerTokenDeNotificaciones = async () => {
    let token;
    const userId = await useStore.getState().getIdUsuarioLogueado();
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }
    if (finalStatus !== 'granted') {
        return;
    }
    
    token = (await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId
    })).data;
    console.log(`📲 Token de notificación obtenido: ${token}`);

    if (token) {
        const response = await sendTokenService(userId, token);
        console.log('📡 Respuesta del backend:', response);
    }
    habilitarNotificacionesForeground()

    if (token) {
        await sendTokenService(userId, token);
    }

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