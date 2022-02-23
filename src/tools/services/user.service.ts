import axios from "axios";
import {API_URL} from "@/tools/consts/api";

 class UserService {
    api_url = API_URL;
    async login(user: object) {
        const {data} = await axios.post(this.api_url + 'login', user);
        localStorage.setItem('user', JSON.stringify(data));
            return data;
    }

    logout() {
        localStorage.clear();
        location.reload();
    }

    isLogged() {
        return localStorage.getItem('user') != undefined;
    }

    async signin(user: object) {
            const {data} = await axios.post(this.api_url + 'register', user);
            return data;
    }
}

export default new UserService();
