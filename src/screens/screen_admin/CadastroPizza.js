import React, { useState, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import * as PostPizzaService from "../../services/firebase_firestore_database_services/PostPizzaService";
import * as GetPizzaService from "../../services/firebase_firestore_database_services/GetPizzaService";
import Registro from '../../components/Registro';

export default function CadastroPizza(props) {

    const [form, setForm] = useState({})
    const {navigation } = props
    const [pizza, setPizza] = useState([])

    const buscarPizza = async () => {
        try {
            let dados = await GetPizzaService.getPizza()
            setPizza(dados)
        } catch (error) {

        }
    }

    useLayoutEffect(() => {
        buscarPizza()
    }, [])

    const efetuarCadastro = async () => {
        if (form.nome_pizza && form.imagem_id && form.endereco) {
            try {
                await PostPizzaService.postPizza(form)
                Alert.alert("Dados Registrados com Sucesso")
                setForm({})
                navigation.navigate("Menu", { atualizar: true })
            } catch (error) {
                Alert.alert("Erro ao registrar", "Verifique os campos, em especial o endereço!")
            }
        } else {
            Alert.alert("Campos não preenchidos corretamente!")
        }
    }


    return (
        <View style={styles.container}>
            <Text style={{ textAlign: "center" }}>Informe os dados da Pizza:</Text>
            <View style={styles.input}>
                <TextInput
                    placeholder='Nome da Pizza'
                    value={form.nome_pizza}
                    onChangeText={(value) => setForm(Object.assign({}, form, { nome_pizza: value }))}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Id da Imagem'
                    value={form.imagem_id}
                    onChangeText={(value) => setForm(Object.assign({}, form, { imagem_id: value }))}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Endereço Completo'
                    value={form.endereco}
                    onChangeText={(value) => setForm(Object.assign({}, form, { endereco: value }))}

                />
            </View>
            <View style={styles.linha}>
                <View style={styles.coluna}>
                    <Button
                        title='Registrar Pizza'
                        onPress={efetuarCadastro}
                        color={"#de6118"}
                    />
                </View>
            </View>
            <StatusBar style="auto" />

            <FlatList
                data={pizza}
                renderItem={({ item }) => <Registro dados={item} buscarPizza={buscarPizza} navigation={navigation} />}
                keyExtractor={item => item.key}
            />            
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
        //justifyContent: 'center',
    }, input: {
        borderWidth: 1,
        borderColor: "gray",
        margin: 5,
        width: "99%",
        padding: 3,
        borderRadius: 5
    },
    linha: {
        flexDirection: "row"
    },
    coluna: {
        flex: 1,
        flexDirection: "row",
        marginLeft: 5
    },
});