import axios from "axios";

const Api = axios.create({ baseURL: "http://4bfbc2334d8b.ngrok.io/api/v1" });

export default Api;
