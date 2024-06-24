import { Toast } from 'toastify-react-native'

const INTERNAL_SERVER_ERROR = 500

export const useMessageToast = () => {

    const errorToast = (error) => {
        const response = error.response ? error.response : 'Error de dominio'
        const status = error.response ? response.status : '400'
        const message = response.data ? response.data.message : error.message

        const mensajeError =
            status >= INTERNAL_SERVER_ERROR
                ? 'Ocurrió un error. Consulte al administrador del sistema'
                : status === undefined
                    ? 'Ocurrió un error al conectarse al backend. Consulte al administrador del sistema'
                    : message
        if (status >= INTERNAL_SERVER_ERROR) {
            console.error(error)
        }
        Toast.show({
            type: 'error',
            text1: mensajeError,
            position: 'bottom',
            autoHide: true,
            visibilityTime: 5000,
        })
    }

    const successToast = (mensajeExitoso) => {
        Toast.show({
            type: 'success',
            text1: mensajeExitoso,
            position: 'bottom',
            autoHide: true,
            visibilityTime: 5000,
        })
    }

    return { errorToast, successToast }
}