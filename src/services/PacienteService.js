const axios = require("axios")

const URL_PACIENTE_API = "https://api-smilerec.herokuapp.com/api/pacientes"

export const getPacientes = () => {
  return axios({
    url: URL_PACIENTE_API,
    method: "get"
  })
}

export const getPaciente = (id) => {
  return axios({
    url: URL_PACIENTE_API + "/" + id,
    method: "get"
  })
}

export const getPacientesByIdTutor = (idTutor) => {
  return axios({
    url: URL_PACIENTE_API + "/terapeuta/" + idTutor,
    method: "get"
  })
}

export const postPaciente = (nome, dataNascimento, genero, idTutor) => {
  return axios({
    url: URL_PACIENTE_API,
    method: "post",
    data: {
      nome,
      dataNascimento,
      genero,
      acertos: 0,
      tentativas: 0,
      terapeuta: {
        id: idTutor
      }
    }
  })
}

export const putPaciente = (id, nome, dataNascimento, genero, acertos, tentativas, idTutor) =>{
  return axios({
    url: URL_PACIENTE_API,
    method: "put",
    data: {
      id,
      nome,
      dataNascimento,
      genero,
      acertos,
      tentativas,
      terapeuta: {
        id: idTutor
      }
    }
  })
}

export const deletePaciente = (id) =>{
  return axios({
    url: URL_PACIENTE_API,
    method: "delete",
    data: {
      id
    }
  })
}