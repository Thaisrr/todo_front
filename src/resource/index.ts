import store from "../store/index";
import axios from "axios";

export default () => {

    axios.interceptors.request.use(req => {
        const user = store.getters.user;
        if(user && user.token) {
            req.headers ??= {};
            req.headers.Authorization = `Bearer ${user.token}`;
        }
        return req;
    }, function(err) {
        return Promise.reject(err);
    });


}
