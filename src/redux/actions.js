import axios from "axios"
import { ADD_TO_CART, DELETE_FROM_CART, DELETE_ITEM, FETCH_PRODUCT, FETCH_PRODUCTS, PLACE_ORDER } from "./actionTypes"

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product
    }
}

export const deleteFromCart = (productId) => {
    return {
        type: DELETE_FROM_CART,
        payload: productId 
    }
}

export const deleteItem = (productId) => {
    return {
        type: DELETE_ITEM,
        payload: productId
    }
}

export const fetchProducts = (products) => {
    return {
        type: FETCH_PRODUCTS,
        payload: products
    }
}

export const fetchProduct = (product) => {
    return {
        type: FETCH_PRODUCT,
        payload: product
    }
}

export const placeOrder = (cartItems) => {
    return {
        type: PLACE_ORDER,
        payload: cartItems
    }
}

export const productsData = () => {
    return (dispatch) => {
        axios.get('https://fakestoreapi.com/products')
            .then(pro => {
                //console.log(pro.data);
                dispatch(fetchProducts(pro.data));
            })
    }
}

export const productData = (id) => {
    return (dispatch) => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(pro => {
                //console.log(pro);
                dispatch(fetchProduct(pro))
            })
    }
}