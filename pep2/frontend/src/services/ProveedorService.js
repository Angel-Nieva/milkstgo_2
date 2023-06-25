import axios from 'axios';

const API_URL  = "http://localhost:8082/proveedor";

class ProveedorService {
    getProveedores(){
        return axios.get(API_URL);
    }
}

export default new ProveedorService();