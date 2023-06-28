import axios from 'axios';

const API_URL  = "http://localhost:8080/acopio";

class AcopioService {
    getAcopios(){
        return axios.get(API_URL);
    }

    CargarArchivo(file){
        return axios.post(API_URL + "/fileUploadAcopios", file);
    }
}

export default new AcopioService();