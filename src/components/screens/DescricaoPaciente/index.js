import React, {
  useEffect,
  useState
} from "react"

import {
  Alert,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from "react-native"

import {
  Button
} from "react-native-elements"

import { deletePaciente, getPaciente } from "../../../services/PacienteService"



const DescricaoPaciente = (props) => {
  
  const { idPaciente } = props.route.params

  const [paciente, setPaciente] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  const deletarPaciente = (id) => {
    deletePaciente(id)
    props.navigation.reset({
      index: 0,
      routes: [
        {
          name: "home"
        }
      ]
    })
  }
  
  const getPacienteAPI = () => {
    setIsLoading(true)
    getPaciente(idPaciente)
    .then((response) => {
      setPaciente(response.data)
    })
    .catch(() => Alert.alert("Erro", "Não foi possivel recuperar o paciente"))
    .finally(() => setIsLoading(false))
  }
  
  useEffect(() => {
    getPacienteAPI()
  }, [])

  return(
    <View style={ estilos.container }>
    
      <RefreshControl
        onRefresh={() => getPacienteAPI()}
        refreshing={isLoading} >
      
      <Text></Text>

      <Text style={ estilos.titulo }>
          Nome:
      </Text>
      <Text style={estilos.texto}>
        { paciente.nome }
      </Text>

      <View style={ estilos.espacamento } />

      <Text style={ estilos.titulo }>
          Data de Nascimento:
      </Text>
      <Text style={estilos.texto}>
        { paciente.dataNascimento }
      </Text>

      <View style={ estilos.espacamento } />

      <Text style={ estilos.titulo }>
        Gênero:
      </Text>
      <Text style={estilos.texto}> 
        { paciente.genero }
      </Text>

      <View style={ estilos.espacamento } />

      <Text style={ estilos.titulo }>
        Total de acertos:
      </Text>
      <Text style={estilos.texto}>
        { paciente.acertos }
      </Text>

      <View style={ estilos.espacamento } />

      <Text style={ estilos.titulo }>
        Total de tentivas:
      </Text>
      <Text style={estilos.texto}>
        { paciente.tentativas }
      </Text>

      <View style={ estilos.espacamento } />

      <Button
        icon={{
          color: "#FFF",
          name: "play",
          type: "font-awesome-5"
        }}
        onPress={() => props.navigation.navigate("jogo", {paciente})}
        title="Jogar" />

      <View style={ estilos.espacamento } />

      <Button
        icon={{
          color: "#FFF",
          name: "edit",
          type: "font-awesome-5"
        }}
        onPress={() => props.navigation.navigate("editarPaciente", {paciente})}
        title="Editar Paciente" />

      <View style={ estilos.espacamento } />

        <Button
          buttonStyle={{backgroundColor: "red"}}
          icon={{
            color: "white",
            name: "trash",
            type: "font-awesome-5"
          }}
          onPress={() => deletarPaciente(paciente.id)}
          title="Excluir Paciente" />

      </RefreshControl>

    </View>
  )
}

const estilos = StyleSheet.create({
  container: {
    padding: 16,
    alignContent: "center"
  },
  espacamento: {
    marginBottom: 8
  },
  titulo: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold"
  },
  texto: {
    alignSelf: "center",
    fontSize: 16
  }
})

export default DescricaoPaciente