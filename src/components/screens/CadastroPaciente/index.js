import React, {
  useState,
  useEffect
} from "react"

import{
  Alert,
  Text,
  View
} from "react-native"

import {
  Button,
  Input
} from "react-native-elements"

import validator from 'validator'

import { postPaciente } from "../../../services/PacienteService"
import { getId } from "../../../database/DB"

const CadastroPaciente = (props) => {

  const [nome, setNome] = useState("")
  const [dataNascimento, setDataNascimento] = useState("")
  const [genero, setGenero] = useState("")
  const [idTutor, setIdTutor] = useState()

  useEffect(() => {
    getId((error, id) => {
      if(!error && id > 0){
        setIdTutor(id)
      }
    })
  })

  const validar = () => {
    if(nome.trim().length === 0){
      Alert.alert("Erro", "Informe o nome do Paciente")
      return false
    }

    if(dataNascimento.trim().length === 0){
      Alert.alert("Erro", "Informe a data de nascimento do Paciente")
      return false
    }

    const [day, month, year] =  dataNascimento.split('/')
    const format = `${year}/${month}/${day}`

    if (!validator.isDate(format)) {
      Alert.alert("Erro", "Informe um data válida")
      return false
    }

    var date = new Date()
    var hojeString = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()

    var hojeData = new Date(hojeString)
    var nascimento = new Date(format)

    if( nascimento > hojeData){
      Alert.alert("Erro", "Data informada não pode ser superior ao dia de hoje")
      return false
    }

    if(genero.trim().length === 0){
      Alert.alert("Erro", "Informe o gênero do Paciente")
      return false
    }
    return true
  }

  const cadastrar = () => {
    if(validar()){
      postPaciente(nome, dataNascimento, genero, idTutor)
        .then(() => {
          Alert.alert("Sucesso", "Paciente cadastrado com sucesso")
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: "home"
              }
            ]
          })
        })
        .catch(() => Alert.alert("Erro", "Não foi possível cadastrar"))
    }
  }

  return(
    <View style={{ padding: 8 }}>
      <Text>Nome completo:</Text>
      <Input
        leftIcon={{
          name: 'user',
          solid: true,
          type: 'font-awesome-5'
        }}
        onChangeText={(txt) => setNome(txt)}
        value={nome} />

      <Text>Data de Nascimento:</Text>
      <Input
        leftIcon={{
          name: 'calendar',
          solid: true,
          type: 'font-awesome-5'
        }}
        onChangeText={(txt) => setDataNascimento(txt)}
        value={dataNascimento} />

      <Text>Gênero:</Text>
      <Input
        leftIcon={{
          name: "neuter",
          solid: true,
          type: 'font-awesome-5'
        }}
        onChangeText={(txt) => setGenero(txt)}
        value={genero} />

      <Button
        icon={{
          color: '#FFF',
          name: 'sign-in-alt',
          type: 'font-awesome-5'
        }}
        onPress={() => cadastrar()}
        title='Cadastrar' />

    </View>
  )
}

export default CadastroPaciente