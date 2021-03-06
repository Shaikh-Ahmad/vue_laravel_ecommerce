require('./bootstrap');
require('./bootstrap');

import { vue } from 'laravel-mix';
import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

import VueRouter from 'vue-router';
import axios from 'axios';
Vue.use(VueRouter);

const router = new VueRouter({
    model: 'history',
    routes: require('./routes.js')
});

const store = new Vuex.Store({
    state:{
        products: [],
        cart: [],
        order: [],
    },
    mutations:{
        updateProducts(state ,products){
            state.products = products;
        },
        addToCart(state , product){

            let productInCartIndex = state.cart.findIndex(item => item.slug == product.slug);
            if(productInCartIndex != -1){
                state.cart[productInCartIndex].quantity++ ;
                return;
            }
            product.quantity = 1;
            state.cart.push(product);
        },
        removeFromCart(state, index){
            state.cart.splice(index , 1);
        },
        updateOrder(state , order){
            state.order = order;
        },
        updateCart(state , cart){
            state.cart = cart;
        }
    },
    actions:{
        getProducts({commit}){
            //fetch the product and their attached catecoriges from the api
            axios.get('/api/products')
            .then((response) => {
                commit('s', response.data)
            })
            .catch((error) => console.error(error));
        },
        clearCart({commit}){
            commit('updateCart', [])

        }
    }

});

const app = new Vue({
    router,
    store,
    el : '#app',
    created(){
        store.dispatch('getProducts')
        .then(_ => {})
        .catch((error) => console.error(error));
    }
});