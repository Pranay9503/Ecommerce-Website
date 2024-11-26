import { ADD_TO_CART, DELETE_FROM_CART, DELETE_ITEM, PLACE_ORDER } from "./actionTypes";

export const initialState = {
    cart: [],
    orders: []
}

const cartReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART :
            const exist = state.cart.find((x) => x.id === action.payload.id);
            if(exist){
                return {
                    ...state,
                    cart: state.cart.map((x) => x.id === action.payload.id ? {...x, qty: x.qty + 1} : x)
                }
                // return state.cart.map(
                //     (x) => (
                //         x.id === action.payload.id ? {...x, qty: x.qty + 1} : x
                //         //console.log(1)
                //     )
                // );
            } else {
                return {
                    ...state,
                    cart: [
                        ...state.cart,
                        {...action.payload,qty: 1}
                    ]
                }
            }

        case DELETE_FROM_CART:
            const exist1 = state.cart.find((x) => x.id === action.payload);
            if(exist1.qty === 1){
                return {
                    ...state,
                    cart: state.cart.filter((product) => product.id !== action.payload)
                }
                // return state.cart.filter((product) => product.id !== action.payload);
            } else {
                return {
                    ...state,
                    cart: state.cart.map((x) => x.id === action.payload ? {...x, qty: x.qty - 1} : x)
                }
                // return state.cart.map((x) => x.id === action.payload ? {...x, qty: x.qty - 1} : x);
            }
        
        case DELETE_ITEM:
            return {
                ...state,
                cart: state.cart.filter((x) => x.id !== action.payload)
            }

        case PLACE_ORDER:
            return {
                ...state,
                orders: [
                    ...state.orders,
                    [...action.payload]
                ],
                cart: []
            }

        default:
            return state;
    }
}

export default cartReducer;