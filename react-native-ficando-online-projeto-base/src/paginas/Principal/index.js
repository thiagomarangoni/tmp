import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import estilos from './estilos';
import { buscausuario } from '../../servicos/requisicoes/usuarios';
import { pegar } from '../../servicos/requisicoes/repositorio';


export default function Principal({ navigation }) {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [usuario, setUsuario] = useState({});

    async function busca(){

       const resultado = await buscausuario(nomeUsuario)
       console.log(resultado)

        if (resultado)
        {
            setUsuario(resultado)
        }
        else
        {
            Alert.alert ('Nome não existe')
            setUsuario({})
        }
    };


    return (
        <ScrollView>


            <View style={estilos.container}>
            { 
                usuario?.nome &&
                
                <>
                    <View style={estilos.fundo} />
                    <View style={estilos.imagemArea}>
                        <Image source={{ uri: usuario.foto }} style={estilos.imagem} />
                    </View>
                    <Text style={estilos.textoNome}>{usuario.nome}</Text>
                    <Text style={estilos.textoEmail}>{usuario.email}</Text>
                    <View style={estilos.seguidoresArea}>
                        <View style={estilos.seguidores}>
                          <Text style={estilos.seguidoresNumero}>30</Text>
                            <Text style={estilos.seguidoresTexto}>Seguidores</Text>
                        </View>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>40</Text>
                            <Text style={estilos.seguidoresTexto}>Seguindo</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Repositorios', {id: usuario.id})}>
                        <Text style={estilos.repositorios}>
                            Ver os repositórios
                        </Text>
                    </TouchableOpacity>
                </>
            }
            
                <TextInput
                
                    setNomeUsuario ={''}
                    placeholder="Busque por um usuário"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeUsuario}
                    onChangeText={setNomeUsuario}
                />


                <TouchableOpacity style={estilos.botao} onPress={busca}>

                    <Text style={estilos.textoBotao}>
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
