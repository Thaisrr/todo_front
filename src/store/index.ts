import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        alert_msg: '',
        alert_lvl: 'info',
        user: {},
        role: '',
        isLogged: false
    },
    getters: {
        alert_msg: (st) => st.alert_msg,
        alert_lvl: (st) => st.alert_lvl,
        user: (st) => st.user,
        isLogged: (st) => st.isLogged
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
        setIsLogged: (st, val) => st.isLogged = val
    },
    actions: {
        setUser: ({commit}, val) => {
            console.log('----Store')
            console.log(val)
           commit('setUser', val);
           commit('setIsLogged', !!(val))
        },
    }
});
