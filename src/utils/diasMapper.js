import dias from '../data/dias.json'

const findDias = (data, dia) => {
    return data.filter(_data => _data.diaDeLaSemana === dia.toUpperCase())
}

const findMomento = (diasActuales) => {
    const mañana = diasActuales.some(_dia => _dia.horarioFavorito === "MAÑANA")
    const tarde = diasActuales.some(_dia => _dia.horarioFavorito === "TARDE")
    const noche = diasActuales.some(_dia => _dia.horarioFavorito === "NOCHE")
    return  ({ mañana, tarde, noche})
}

export const getHorariosPreferidos = (data) => {
    return dias.map(dia => {
        const diasActuales = findDias(data, dia)
        if(diasActuales.length === 0) return ({ mañana: false, tarde: false, noche: false})
        
        return  findMomento(diasActuales)  
    })
}

export const juegaEnEsteDia = (data, diaIndex) => findDias(data, dias[diaIndex]).length > 0
