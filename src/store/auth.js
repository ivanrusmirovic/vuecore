import { Axios } from "axios";

const loginUrl = "http://localhost:44304/api/auth";
//pogledaj koja je tvoja adresa pa je zameni iznad u localhost jer nije ova 44304!

export default {
    namespaced: true,
    state: {
        authenticated: false
    },
    mutations: {
        setAuthenticated(state) {
            state.authenticated = true;
        }
    },
    actions: {
        async authenticate(context, credentials) {
            let responce = await Axios.post(loginUrl, credentials);
            if(responce.data.success == true) {
                context.commit("setAuthenticated");
            }
        }
    },
};