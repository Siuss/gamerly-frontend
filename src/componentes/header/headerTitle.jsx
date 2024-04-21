import { Box, Heading, Button } from "@chakra-ui/react"
import { useLocation} from "react-router-dom"
import { theme } from '../../styles/style'
import { useNavigate} from 'react-router-dom'
import { GiReturnArrow } from "react-icons/gi";

export const HeaderTitle = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const volver = () => {
    navigate('/home')
  }

  const cambiarTitulo = () => {
    const titulos = {
      '/home': 'Home',
      '/perfil': 'Mi Perfil',
      '/reseñas': 'Reseñas',
      '/busquedaAvanzada': 'Busqueda Avanzada',
    }
  
    const matchingRoute = Object.keys(titulos).find((route) => {
      const regex = new RegExp(`^${route}$`)
      return regex.test(location.pathname)
    })
  
    return titulos[matchingRoute] || 'Home'
  }
  const titulo = cambiarTitulo()

  return (
    <Box
      background={theme.colors.brand.blanco}
      w="100%"
      p={4}
      color={theme.colors.brand.colorPrimario}
    >
      <Button
      onClick={volver}
      >
        <GiReturnArrow />
      </Button>
      <Heading fontSize="2rem" fontFamily={theme.fonts.fonts.tipo}>{titulo}</Heading>
    </Box>
  )
}

export default HeaderTitle