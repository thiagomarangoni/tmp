import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { salvarRepositorio } from '../../servicos/requisicoes/repositorio';
import { deletarRepositorio } from '../../servicos/requisicoes/repositorio';

export default function InfoRepositorio({ route, navigation }) {
    const [nome, setNome] = useState(route.params.item.rnome);
    const [data, setData] = useState(route.params.item.rdata);

    async function salvar(){

        const resultado = await salvarRepositorio(

            route.params.item.postId,
            route.params.item.id,
            nome,
            data
        )
        if (resultado == 'Sucesso')
            {
                Alert.alert("Sucesso. Repositorio atualizado !")
                navigation.goBack()
        }
        else{
            Alert.alert("Erro ao atualizar repositório")
        }
    };

    async function deletar()

    {
        const resultado = await deletarRepositorio(route.params.item.id)
        if (resultado === 'Sucesso')
            {
                Alert.alert("Sucesso. Repositorio deletado !")
                navigation.goBack()
        }
        else{
            Alert.alert("Erro ao deletar repositório")
        }
    };

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity 
                style={estilos.botao} 
                onPress={salvar}
            >
                <Text style={estilos.textoBotao}>
                    Salvar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={deletar}
                style={[estilos.botao, {backgroundColor: '#DD2B2B', marginTop: 10}]} 
            >
                <Text style={estilos.textoBotao}>
                    Deletar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
