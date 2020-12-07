import { ADD_ORDER, SET_ORDERS } from "../Actions/OrderAction";
import Order from "../../Models/Order";

const initialState = {
    orders: []
};

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ORDERS:
            console.log("In orders Reducer----------->", action.orders);
            return {
                orders: action.orders
            }


        case ADD_ORDER:
            const newOrder = new Order(
                action.orderData.id,
                action.orderData.cartItems,
                action.orderData.totalAmount,
                action.orderData.date
            );
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }
    return state;
};  

export default orderReducer;