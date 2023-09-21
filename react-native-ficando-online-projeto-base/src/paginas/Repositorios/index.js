import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity,TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { pegar } from '../../servicos/requisicoes/repositorio';
import { useIsFocused } from '@react-navigation/native';
import { buscaRepositorio } from '../../servicos/requisicoes/repositorio';


export default function Repositorios({ route, navigation }) {
    const [nomeRepo, setNomeRepo] = useState('');  
    const [repo, setRepo] = useState([]);
    const estaNaTela = useIsFocused();



    useEffect(() => {
        const dadosdaTela = async () => {
          try {
            const resultado = await pegar(route.params.id);
            setRepo(resultado);
          } catch (error) {
            console.error("Ocorreu um erro ao buscar os dados:", error);
          }
        };
      
        dadosdaTela();
      }, [estaNaTela]);
      
      async function busca(){

        const resultadoRepo = await buscaRepositorio(nomeRepo)
        console.log(resultadoRepo)

 
         if (resultadoRepo)
         {
            setRepo(resultadoRepo)
         }
         else
         {
             Alert.alert ('Nome não existe')
             setRepo({})
         }
     };

    return (
        <View style={estilos.container}>
                

                <Text style={estilos.repositoriosTexto}>Buscar Repositorios</Text>
                    
                      <TextInput
                          setNomeRepo ={''} /* Setando string vazia*/ 
                          placeholder="Busque por repositório"
                          style ={estilos.entrada}
                          autoCapitalize="none"
                          value={nomeRepo}
                          onChangeText={setNomeRepo}
                      />
                   

                
                <TouchableOpacity style={estilos.botao} onPress={busca}>

                    <Text style={estilos.textoBotao}>
                            Buscar
                    </Text>
                </TouchableOpacity>

                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
               
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio', {id:route.params.id})}>   
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>

                

                <FlatList
                        data={repo}
                        style={{width: '100%'}}
                        keyExtractor={repo => repo.id}
                        renderItem={({item}) =>
                        (
                            <TouchableOpacity style ={estilos.repositorio} onPress={() => navigation.navigate('InfoRepositorio', {item})}>

                                <Text style={estilos.repositorioNome}> {item.rnome}</Text>
                                <Text style={estilos.repositorioData}>{item.rdata}</Text>

                            </TouchableOpacity>
                        )}
                    />
        </View>
        
    );



    
}
