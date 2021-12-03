import { Axios } from "axios";

const ordersUrl = "http://localhost:44304/api/orders";
//pogledaj koja je tvoja adresa pa je zameni iznad u localhost jer nije ova 44304!

export default {
    namespaced: true,
    state: {
        orders: [],
    },
    mutations: {
    },
    actions: {
        async storeOrderAction(context, order) {
            return (await Axios.post(ordersUrl, order)).data.id
        }
    },
};