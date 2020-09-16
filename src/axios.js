import axios from "axios";
/** base url to make requests to the movie database */
const instance = axios.create({
  baseURL: "http://localhost:9000",
});
export default instance;
