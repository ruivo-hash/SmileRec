const axios = require("axios")

const URL_TUTOR_API = "https://api-smilerec.herokuapp.com/api/terapeutas"

export const postTutor = (nome, email, cpf, senha) => {
  return axios({
    url: URL_TUTOR_API,
    method: "post",
    data: {
      nome,
      email,
      cpf,
      senha
    }
  })
}

export const login = async (email, senha) => {
  return axios({
    url: "https://api-smilerec.herokuapp.com/login",
    method: "post",
    data: {
      email,
      senha
    }
  })
}