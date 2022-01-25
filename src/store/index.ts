import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        alert_msg: '',
        alert_lvl: 'info',
        user: {},
        role: ''
    },
    getters: {
        alert_msg: (st) => st.alert_msg,
        alert_lvl: (st) => st.alert_lvl,
        user: (st) => st.user
    },
    mutations: {
        setAlertMsg: (st, val) =>{
            st.alert_msg = val;
            setTimeout(() => {
                st.alert_msg = '';
            }, 3000)
        },
        setAlertLvl: (st, val) => st.alert_lvl = val,
        setUser: (st, val) => st.user = val,
    },
    actions: {

    }
});
