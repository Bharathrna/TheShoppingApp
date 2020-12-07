import Product from "../../Models/Product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {

        //write any async code you want!!
        const userID = getState().auth.userID;

        try{
            const response = await fetch('https://project-server-31dba.firebaseio.com/products.json', {   //fetch API can be used for GET, POST and even PUT methods.
                method: 'GET'
            })

            if(!response.ok) {
                throw new Error('Something went wrong!!');
            }

            const responseData = await response.json(); 

            const loadedProducts = []

            for (const key in responseData) {
                loadedProducts.push(new Product(
                    key,
                    responseData[key].ownerID,
                    responseData[key].title,
                    responseData[key].imageUrl,
                    responseData[key].description,
                    responseData[key].price
                ));
            }
            console.log("Response Data while fecthing products from server: ", loadedProducts);


            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(product => product.ownerId === userID)
            })
        } catch(error) {
            throw error;
        }
    }
};

export const deleteProduct = productID => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const response = await fetch(`https://project-server-31dba.firebaseio.com/products/${productID}.json?auth=${token}`, {
            method: 'DELETE'
        })

        if(!response.ok) {
            throw new Error('Something went wrong!!');
        }

        dispatch ({ type: DELETE_PRODUCT, prodID: productID });
    }
};

export const addProduct = (title, price, imageUrl, description) => {
    return async (dispatch, getState) => {

        //write any async code you want!!
        const token = getState().auth.token;
        const userID = getState().auth.userID;

        const response = await fetch(`https://project-server-31dba.firebaseio.com/products.json?auth=${token}`, {   //fetch API can be used for GET, POST and even PUT methods.
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({        // body data provided to http request should be in the JSON format and JSON.stringify will convert the JS object or array to the JSON format.
                title, 
                price, 
                imageUrl, 
                description,
                ownerID: userID
            })
        })

        const responseData = await response.json(); 

        console.log("Response Data for Add product: ", responseData);

        dispatch({
            type: ADD_PRODUCT, 
            product: {
                id: responseData.name,
                title,                   //if both the key and the value names are same, then just mention the name instead of key:value pair.
                price,
                imageUrl,
                description,
                ownerID: userID
            }}
        )
    }
};

export const updateProduct = (productID, title, imageUrl, description) => {
    return async (dispatch, getState) => {

        const token = getState().auth.token;

        const response = await fetch(`https://project-server-31dba.firebaseio.com/products/${productID}.json?auth=${token}`, {   //fetch API can be used for GET, POST and even PUT methods.
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({        // body data provided to http request should be in the JSON format and JSON.stringify will convert the JS object or array to the JSON format.
                title, 
                imageUrl, 
                description
            })
        })

        if(!response.ok) {
            throw new Error('Something went wrong!!');
        }

        dispatch({
            type: UPDATE_PRODUCT, 
            prodID: productID,
            product: {
                title,
                imageUrl,
                description
            } 
        })
    }
};