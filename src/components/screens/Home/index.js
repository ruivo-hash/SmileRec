import React, { useEffect, useState } from "react"

import{
  FlatList,
  RefreshControl,
  View
} from "react-native"

import {
  Button
} from "react-native-elements"

import ListarPaciente from "../../ListagemPaciente"

import { getPacientesByIdTutor } from "../../../services/PacienteService"
import { getId } from "../../../database/DB"

const Home = (props) => {

  const [pacientes, setPacientes] = useState([])
  const [idTutor, setIdTutor] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const getPacientes = (idTutor) => {
    setIsLoading(true)
    getPacientesByIdTutor(idTutor)
    .then((response) => setPacientes(response.data))
    .catch(() => Alert.alert('Erro', 'Não foi possível listar os pacientes!'))
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getId((error, idTutor) => {
      if(!error && idTutor > 0){
        setIdTutor(idTutor)
        getPacientes(idTutor)
      }
    })
  }, [])

  return(
    <View style={{ padding: 8 }}>
      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            onRefresh={() => getPacientes(idTutor)}
            refreshing={isLoading} />
        }
        renderItem={({item}) => (
          <ListarPaciente
            paciente={item}
            onPress={() => {
              props.navigation.navigate("descricaoPaciente", {idPaciente: item.id})
            }}
             />
        )} />

      <Button
      icon={{
        name: "plus-circle",
        color: "#FFF",
        type: "font-awesome-5"
      }}
        onPress={() => {
          
          props.navigation.navigate("cadastroPaciente")
        }}
        title="Cadastrar Paciente" />

      <View style={{ padding: 4 }}></View>

      <Button
      icon={{
        name: "sign-out-alt",
        color: "#FFF",
        type: "font-awesome-5"
      }}
        onPress={() => props.navigation.reset({
          index: 0,
          routes: [
            {
              name: "login"
            }
          ]
        })}
        title="Logout" />

    </View>
  )
}

export default Home