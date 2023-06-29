import axios from 'axios';

const API_URL  = "http://localhost:8080/reporte";

class ReporteService {
    getReportes(){
        return axios.get(API_URL);
    }
}

export default new ReporteService();