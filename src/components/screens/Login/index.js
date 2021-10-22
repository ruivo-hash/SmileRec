import React, {
  useState
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
import { saveId } from "../../../database/DB"

import { login } from "../../../services/TutorService"

const Login = (props) => {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const validar = () => {
    if (email.trim().length === 0) {
      Alert.alert("Erro", "Informe o usuário")
      return false
    }
    if (senha.length === 0) {
      Alert.alert("Erro", "Informe a senha")
      return false
    }
    return true
  }

  const entrar = () => {
    if(validar()){
      login(email, senha)
        .then((response) => {
          const idString = String(response.data.id)
          saveId(idString)
          props.navigation.reset({
            index: 0,
            routes: [{
              name: 'home'
            }]
          })
        })
        .catch(() => Alert.alert("Erro", "E-mail/senha inválidos"))
    }
    
  }

  return(
    <View style={{ padding: 8 }}>
      <Text>E-mail:</Text>
      <Input
        leftIcon={{
          name: 'user',
          solid: true,
          type: 'font-awesome-5'
        }}
        onChangeText={(txt) => setEmail(txt)}
        value={email} />

      <Text>Senha:</Text>
      <Input
        leftIcon={{
          name: 'lock',
          solid: true,
          type: 'font-awesome-5'
        }}
        onChangeText={(txt) => setSenha(txt)}
        secureTextEntry
        value={senha} />

      <Button
        icon={{
          color: '#FFF',
          name: 'sign-in-alt',
          type: 'font-awesome-5'
        }}
        onPress={() => entrar()}
        title='Entrar' />

        
      <View style={{ padding: 4 }}></View>

      <Button
        icon={{
          color: "#FFF",
          name: "plus",
          type: "font-awesome-5"
        }}
        onPress={() => props.navigation.navigate("cadastroTutor")}
        title="Cadastre-se" />

    </View>
  )
}

export default Login