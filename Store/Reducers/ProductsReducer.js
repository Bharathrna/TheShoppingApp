import PRODUCTS from '../../Data/DummyData';
import { DELETE_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../Actions/ProductAction';
import Product from '../../Models/Product';

const initialState = {
    availableProducts: [],
    userProducts: []  
};

const ProductsReducers = (state = initialState, action) => {

    switch (action.type) {
        case SET_PRODUCTS:
            console.log("data type from server within productsReducers : " , action.products);
            return {
                availableProducts: action.products,
                userProducts: action.userProducts 
            }

        case ADD_PRODUCT:
            const productTitle = action.product.title;
            const productPrice = action.product.price;
            const productImageUrl = action.product.imageUrl;
            const productDescription = action.product.description;
            const ownerID = action.product.ownerID;

            console.log("Product price ----------------> ", productPrice);

            const newProduct = new Product(
                action.product.id,
                ownerID,
                productTitle,
                productImageUrl,
                productDescription,
                productPrice
            );

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }

        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.prodID),
                availableProducts: state.availableProducts.filter(product => product.id !== action.prodID)
            }
        
        case UPDATE_PRODUCT:
            const productID = action.prodID;
            const prodTitle = action.product.title;
            const prodImageUrl = action.product.imageUrl;
            const prodDescription = action.product.description;

            console.log("Product ID:", productID);

            const product = state.availableProducts.find(product => product.id === productID);

            console.log("Product is:", product.id);

            const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === productID);
            const userProductIndex = state.userProducts.findIndex(prod => prod.id === productID);

            const updatedProduct = new Product (
                productID,
                product.ownerId,
                prodTitle,
                prodImageUrl,
                prodDescription,
                product.price
            );
            console.log("Available Index:",availableProductIndex);
            console.log("User Index:",userProductIndex);

            const updatedAvailableProducts = Array.from(state.availableProducts);
            const updatedUserProducts = Array.from(state.userProducts);

            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            updatedUserProducts[userProductIndex] = updatedProduct;

            console.log("updatedAvailable:", updatedAvailableProducts);
            console.log("updatedUser:", updatedUserProducts);

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
    }
        
    return state;
};

export default ProductsReducers;