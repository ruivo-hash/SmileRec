import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Home from "./src/components/screens/Home"
import CadastroPaciente from "./src/components/screens/CadastroPaciente"
import CadastroTutor from "./src/components/screens/CadastroTutor"
import Jogo from "./src/components/screens/Jogo"
import Login from "./src/components/screens/Login"
import DescricaoPaciente from "./src/components/screens/DescricaoPaciente"
import EditarPaciente from "./src/components/screens/EditarPaciente"

const Stack = createNativeStackNavigator()

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          component={Login}
          name="login"
          options={{
            title:"Login"
          }} />

        <Stack.Screen
          component={CadastroTutor}
          name="cadastroTutor"
          options={{
            title:"Cadastrar Tutor"
          }} />

        <Stack.Screen
          component={Home}
          name="home"
          options={{
            title:"Pacientes"
          }} />

        <Stack.Screen
          component={CadastroPaciente}
          name="cadastroPaciente"
          options={{
            title:"Cadastrar Paciente"
          }} />

        <Stack.Screen
          component={DescricaoPaciente}
          name="descricaoPaciente"
          options={{
            title:"Informações do Paciente"
          }} />

        <Stack.Screen
          component={Jogo}
          name="jogo"
          options={{
            title:"Jogar"
          }} />

        <Stack.Screen
          component={EditarPaciente}
          name="editarPaciente"
          options={{
            title:"Editar informações do Paciente"
          }} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App