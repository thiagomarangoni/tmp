import api from "../api";

export async function buscausuario(Usuario){
    try{
    
        const resultado = await api.get (`/users?usuario=${Usuario}`)
        return resultado.data[0]
    }
    catch (error){
        console.log(error)
        return {}
    }
}