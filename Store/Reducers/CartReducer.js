import { ADD_TO_CART, REMOVE_FROM_CART } from "../Actions/CartAction";
import CartItem from "../../Models/CartItem";
import { ADD_ORDER } from "../Actions/OrderAction";
import { DELETE_PRODUCT } from "../Actions/ProductAction";

const initialState = {
    cartItems: {},
    totalAmount: 0 
};

const CartReducer = (state = initialState, action) => {
    
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = parseFloat(addedProduct.price);
            const prodTitle = addedProduct.title;

            console.log("Added product: ", addedProduct);

            let updatedOrNewProd;


            if(state.cartItems[addedProduct.id]) {
                updatedOrNewProd = new CartItem(
                    state.cartItems[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.cartItems[addedProduct.id].sum + prodPrice
                );

            }else{
                updatedOrNewProd = new CartItem(1, prodPrice, prodTitle, prodPrice);
            }
            return {
                ...state,
                cartItems: {...state.cartItems, [addedProduct.id]: updatedOrNewProd},
                totalAmount: state.totalAmount + prodPrice  
            }

        case REMOVE_FROM_CART: 
            const productID = action.prodID;
            const currentQty = state.cartItems[productID].quantity;

            let updatedCartItems;

            console.log("Product Id is:", productID);

            if(currentQty > 1) {
                const updatedCartItem = new CartItem(
                    state.cartItems[productID].quantity - 1,
                    state.cartItems[productID].price,
                    state.cartItems[productID].title,
                    state.cartItems[productID].sum - state.cartItems[productID].price
                );
                updatedCartItems = {...state.cartItems, [productID]: updatedCartItem};
            }else {
                    updatedCartItems = {...state.cartItems};
                    delete updatedCartItems[productID];
            }   
            return {
                ...state,
                cartItems: updatedCartItems,
                totalAmount: state.totalAmount - state.cartItems[productID].price
            }

        case ADD_ORDER: 
            return initialState;

        case DELETE_PRODUCT:
            if(!state.cartItems[action.prodID]){
                return state;
            }
            const updatedProducts = {...state.cartItems};
            const amount = state.cartItems[action.prodID].sum;
            delete updatedProducts[action.prodID];
            
            return {
                ...state,
                cartItems: updatedProducts,
                totalAmount: state.totalAmount - amount
            }
    }
    return state;
};

export default CartReducer;