import axios from "axios"

export const API = axios.create({ baseURL: "https://excitel-countries.azurewebsites.net" })

export const countriesUrl = "/countries"
export const getCountryUrl = (name) => `/countries/${name}`
