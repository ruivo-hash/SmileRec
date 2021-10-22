import React, {
  useEffect,
  useState
} from "react"

import{
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"

import {
  Image
} from "react-native-elements"

import { useNavigation } from '@react-navigation/native'

import angryFace from "../../Images/angryface.png"
import disgustFace from "../../Images/disgustface.png"
import happyFace from "../../Images/happyface.png"
import sadface from "../../Images/sadface.png"

import { putPaciente } from "../../../services/PacienteService"

const Jogo = (props) => {

  const navigation = useNavigation();

  const { paciente } = props.route.params

  const [foto, setFoto] = useState("")
  const [idFoto, setIdFoto] = useState(0)
  const [acertos, setAcerto] = useState(0)
  const [tentativas, setTentativa] = useState(0)

  const images = [
    {
      id: 1,
      picture: sadface,
      expression: "Sad"
    },
    {
      id: 2,
      picture: angryFace,
      expression: "Angry"
    },
    {
      id: 3,
      picture: disgustFace,
      expression: "Disgust"
    },
    {
      id: 4,
      picture: happyFace,
      expression: "Happy"
    }
  ]

  var idImage

  const selectImage = () => {
    var min = 1
    var max = images.length
    idImage = Math.floor(Math.random() * (max-min+1) + min)

    const image = images.find((img) => {
      return img.id === idImage
    })
    return image.picture
  }
  
  const salvarEVoltar = () => {
    const nAcertos = paciente.acertos + acertos
    const nTentativas = paciente.tentativas + tentativas
    putPaciente(paciente.id, paciente.nome, paciente.dataNascimento, paciente.genero, nAcertos, nTentativas, paciente.terapeuta.id)
    navigation.navigate("descricaoPaciente", {idPaciente: paciente.id})
  }

  const validarAcerto = (idExpressao) => {
    if(idFoto === 0){
      if(idImage === idExpressao){
        setAcerto(acertos + 1)
        setTentativa(tentativas + 1)
        Alert.alert("Parabéns", "Você acertou a expressão!")
      }else{
        setTentativa(tentativas + 1)
        Alert.alert("Oh não", "Você errou a expressão!")
      }
    }else if(idFoto === idExpressao){
      setAcerto(acertos + 1)
      setTentativa(tentativas + 1)
      Alert.alert("Parabéns", "Você acertou a expressão!")
    }else{
      setTentativa(tentativas + 1)
      Alert.alert("Oh não", "Você errou a expressão!")
    }
    setFoto(selectImage())
    setIdFoto(idImage)
  }

  return(
    <View style={styles.screen} >
      <Text style={{ fontSize: 24, padding: 8 }}>
        Qual a cor que melhor representa a expressão a seguir?
      </Text>

      {foto.length === 0 && (
         <Image
         source={selectImage()}
         style={{height: 300, width: 300}} />
      ) || (
        <Image
          source={foto}
          style={{height: 300, width: 300}} />
      )}

      <View style={{padding: 12}}></View>

      <View style={{flexDirection: "row"}}>

        <TouchableOpacity
          onPress={() => validarAcerto(1)}
          style={[styles.button, {backgroundColor: "blue"}]}>
          <Text style={styles.text}>Tristeza</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => validarAcerto(2)}
          style={[styles.button, {backgroundColor: "red"}]}>
            <Text style={styles.text}>Raiva</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => validarAcerto(3)}
          style={[styles.button, {backgroundColor: "green"}]}>
            <Text style={styles.text}>Repulsa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => validarAcerto(4)}
          style={[styles.button, {backgroundColor: "#FFC200"}]}>
            <Text style={styles.text}>Alegria</Text>
        </TouchableOpacity>

      </View>

        <Button
          onPress={() => salvarEVoltar()}
          title="Voltar" />

    </View>
  )
}

export default Jogo

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  alternatives: {
    flexDirection: "row",
    padding: 8
  },
  button: {
    width: 94,
    height: 50,
    justifyContent: 'center',
    borderRadius: 4,
    alignItems: 'center',
    margin: 4
  },
  text: {
    color: "#FFF",
    fontSize: 24,
    borderColor: "#000"
  }
});