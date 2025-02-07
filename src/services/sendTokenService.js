import api from './apiConfig'; 

export const sendTokenService = async (userId, expoPushToken) => {
    try {
        const response = await api.put(`/token/${userId}`, {expoPushToken});

        if (response.status === 200) {
            console.log('Token actualizado correctamente');
        } else {
            console.error('Error al actualizar el token');
        }
    } catch (error) {
        console.error('Error al enviar el token al backend:', error);
    }
};