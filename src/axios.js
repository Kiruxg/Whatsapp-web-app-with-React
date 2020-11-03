import axios from "axios"
/** base url to make requests to the movie database */
const instance = axios.create({
  baseURL: "https://whatsappweb-backend.herokuapp.com/"
})
export default instance
// "http://localhost:9000"
