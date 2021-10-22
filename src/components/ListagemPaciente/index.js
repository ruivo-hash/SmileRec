import React from "react"

import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native"

const ListarPaciente = (props) => {

  const porcentagemAcertos = () => {
    var acertos = props.paciente.acertos
    var tentativas = props.paciente.tentativas
    if( acertos === 0 ){
      return 0
    }
    return ((acertos*100)/tentativas).toFixed(2)
  }

  return(
    <TouchableOpacity
      onPress={() => typeof props.onPress === "function" ? props.onPress() : {}}
      style={{
        borderBottomColor: "#DDD",
        borderBottomWidth: 2,
        flexDirection: "row",
        padding: 8 
      }}>

      <View>
        <Text style={{fontSize: 18, fontWeight: "bold"}} >
          {props.paciente.nome}
        </Text>

        <Text>
          Acertos/Total De Tentativas: {props.paciente.acertos}/{props.paciente.tentativas}
        </Text>

        <Text>
          Porcentagem de acertos: {porcentagemAcertos()}%
        </Text>
        
      </View>
    </TouchableOpacity>
  )
}

export default ListarPaciente