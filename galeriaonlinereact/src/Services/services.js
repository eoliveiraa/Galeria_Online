import axios from "axios";

const apiPorta = "7273";

//endereço da api
const apiLocal = `https://localhost:${apiPorta}/api/`;

const api = axios.create({
    baseURL: apiLocal
});

export default api;

// As estruturas da pasta services são praticamente as mesmas 
