import axios from 'axios';

const API_URL  = "http://localhost:8080/grasa-solido";

class GrasaSolidoService {
    getGrasaSolido(){
        return axios.get(API_URL);
    }

    CargarArchivo(file){
        return axios.post(API_URL + "/fileUpload", file);
    }
}

export default new GrasaSolidoService();