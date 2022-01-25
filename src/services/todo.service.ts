import Todo from "@/tools/interfaces/Todo";
import axios from "axios";
import {API_URL} from "@/tools/consts/api";

class TodoService {
    api_url = API_URL + 'todo/';
    headers = {'Content-Types': 'application/json'};

    async getAll() {
        try {
            const {data} = await axios(this.api_url);
            return data;
        } catch (e) {
            console.warn(e);
            return
        }
    }

    async update(td: Todo) {
        try {
            const {data} = await axios.put(this.api_url + td.id, td);
            return data;
        } catch (e) {
            console.warn(e);
            return
        }
    }

    async create(td: Todo) {
        try {
            const {data} = await axios.post(this.api_url, td, {headers: this.headers});
            return data;
        } catch (e) {
            console.warn(e);
            return
        }
    }

    async delete(td: number) {
        try {
            const {data} = await axios.delete(this.api_url + String(td));
            return data;
        } catch (e) {
            console.warn(e);
            return
        }
    }

}

export default new TodoService();
