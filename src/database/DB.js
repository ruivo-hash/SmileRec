import AsyncStorage from "@react-native-async-storage/async-storage";

const saveId = async (id, callback = null) => {
  try {
    await AsyncStorage.setItem("id", id, callback)
  } catch (error) {
    throw new Error("Não foi possível salvar o token!")
  }
}

const getId = async (callback = null) => {
  try {
    await AsyncStorage.getItem("id", callback)
  } catch (error) {
    throw new Error("Não foi possível recuperar o id")
  }
}

export { saveId, getId }