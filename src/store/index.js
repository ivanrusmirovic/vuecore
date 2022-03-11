import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import CartModule from "./cart";
import OrderModule from "./orders";
import AuthModule from "/.auth";

Vue.use(Vuex);

const baseUrl = "https://localhost:44399/api";

const pagesUrl = `${baseUrl}/pages`;
const categoriesUrl = `${baseUrl}/categories`;
const productsUrl = `${baseUrl}/products`;
const productImagesUrl = "https://localhost:44399/media/products/";

export default new Vuex.Store({

    strict: true,
    modules: { cart: CartModule, orders: OrderModule, auth: AuthModule },
    state: {
        pages: [],
        categories: [],
        products: [],
        productImages : productImagesUrl,
        currentPage: 1,
        pageCount: 0,
        pageSize: 4,
        currentCategory: "all"
    },
    getters: {
        productById: (state) => (id) => state.products.find((p) => p.id == id),
        pageById: (state) => (id) => state.pages.find((p) => p.id == id),
    },
    mutations: {
        setPages(state, pages) {
            state.pages = pages;
        },
        setCategories(state, categories){
            state.categories = categories;
        },
        setProducts(state, products){
            state.products = products;
        },
        setPageCount(state, count){
            state.pageCount = Math.ceil(Number(count) / state.pageSize);
        },
        setCurrentCategory(state,category) {
            state.currentCategory = category;
        },
        setCurrentPage(state, page) {
            state.currentPage = page;
        }
    },
    actions:{
        async setPagesAction(context) {
            context.commit("setPages", (await Axios.get(pagesUrl)).data);
        },
        async setCategoriesAction(context){
            context.commit("setCategories", (await Axios.get(categoriesUrl)).data);
        },
        async setProductsByCategoryAction(context, category) {
            let url;
            let productCountUrl;
            if (category !="all") {
                url = `${productsUrl}/${category}?p=${context.state.currentPage}`;
                productCountUrl = `${productsUrl}/count/${category}`;
            } else {
                url = `${productsUrl}`;
                productCountUrl = `${productsUrl}/count/all`;
            }

            let productCount = (await Axios.get(productCountUrl)).data;

            context.commit("setPageCount",productCount);
            context.commit("setProducts", (await Axios.get(url)).data);

        },
        async setProductsByCategoryPaginationAction(context, page){
            let url;
            if (context.state.currentCategory !=="all"){
                url = `${productsUrl}/${context.state.currentCategory}?p=${page}`;
            }
            else{
                url = `${productsUrl}?=${page}`;
            }

            context.commit("setProducts", (await Axios.get(url)).data);

        },

        async addProduct(context, product) {
            await Axios.post(productsUrl, product);
        },
        async editProduct(context, product) {
            await Axios.put(productsUrl, product);
        },
        async deleteProduct(context,product) {
            await Axios.delete(`${productsUrl}/${product.id}`);
            let url = `${productsUrl}?p=${context.state.currentPage}`;
            context.commit("setProducts", (await (await Axios.get(url)).data));
        },
        async addPage(context, page) {
            await Axios.post(pagesUrl, page);
            context.commit("setPages", (await Axios.get(pagesUrl)).data);
        },
        async editPage(context, page) {
            await Axios.put(`${pagesUrl}/${page.id}`, page);
            context.commit("setPages", (await Axios.get(pagesUrl)).data);
        },
        async deletePage(context,page) {
            await Axios.delete(`${pagesUrl}/${page.id}`);
            context.commit("setPages", (await Axios.get(pagesUrl)).data);
    },
},
});
