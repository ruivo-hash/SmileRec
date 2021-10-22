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

import { postTutor } from "../../../services/TutorService"

const CadastroTutor = (props) => {
  
  const validar = () => {
    if(nome.trim().length === 0){
      Alert.alert("Erro", "Informe seu nome completo")
      return false
    }
    if(senha.trim().length === 0){
      Alert.alert("Erro", "Informe senha")
      return false
    }
    if(senha != confirmarSenha){
      Alert.alert("Erro", "Senhas estão diferentes")
      return false
    }
    return true
  }
  
  const cadastrar = () => {
    if( validar() ){
      postTutor(nome, email, cpf, senha)
        .then(() => {
          Alert.alert("Sucesso", "Tutor cadastrado com sucesso")
          props.navigation.reset({
            index: 0,
            routes: [
              {
                name: "home",
                params: {email}
              }
            ]
          })
        })
        .catch(() => Alert.alert("Erro", "Não foi possível cadastrar"))
    }
  }

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

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

      <Text>E-mail:</Text>
      <Input
        leftIcon={{
          name: 'at',
          solid: true,
          type: 'font-awesome-5'
        }}
        onChangeText={(txt) => setEmail(txt)}
        value={email} />

      <Text>CPF:</Text>
      <Input
        leftIcon={{
          name: 'address-card',
          solid: true,
          type: 'font-awesome-5'
        }}
        onChangeText={(txt) => setCpf(txt)}
        value={cpf} />

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

      <Text>Confirme sua senha:</Text>
      <Input
        leftIcon={{
          name: 'lock',
          solid: true,
          type: 'font-awesome-5'
        }}
        onChangeText={(txt) => setConfirmarSenha(txt)}
        secureTextEntry
        value={confirmarSenha} />

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

export default CadastroTutor