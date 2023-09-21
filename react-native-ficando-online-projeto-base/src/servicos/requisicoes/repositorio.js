import api from "../api";


export async function pegar(id)
{
    try{
    
        const resultado = await api.get (`/repositories?postId=${id}`)
        return resultado.data
        
    }
    catch (error){
        console.log(error)
        return []
    }
}

export async function salvarRepositorio(postId,id,rnome,rdata)
{

    try{

        const resultado = await api.put(`/repositories/${id}`,
        {
            postId:postId,
            id:id,
            rnome:rnome,
            rdata:rdata 
        });
        return 'Sucesso'
    }

    catch (error){
        console.log(error)
        return 'Erro'
    }

}

export async function criarRepositorio(postId,rnome,rdata)
{

    try{

        await api.post(`/repositories`,
        {
            postId:postId,
            rnome:rnome,
            rdata:rdata 
        });
        return 'Sucesso'
    }

    catch (error){
        console.log(error)
        return 'Erro'
    }

}


export async function deletarRepositorio(id)
{

    try{

        await api.delete(`/repositories/${id}`);
        return 'Sucesso'
    }

    catch (error){
        console.log(error)
        return 'Erro'
    }

}

export async function buscaRepositorio(rnome){
    try{
    
        const resultadoNome = await api.get (`/repositories?rnome${rnome}`)
        return resultadoNome.data[0]
        console.log(resultadoNome)
    }
    catch (error){
        console.log(error)
        return {}
    }
}