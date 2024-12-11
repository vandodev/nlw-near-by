import axios from "axios"

export const api = axios.create({
  baseURL: "http://192.168.2.104:3333",
  timeout: 700,
})