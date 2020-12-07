import Order from "../../Models/Order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        //write any async code you want!!

        const userID = getState().auth.userID;

        try{
            const response = await fetch(`https://project-server-31dba.firebaseio.com/orders/${userID}.json`, {   //fetch API can be used for GET, POST and even PUT methods.
                method: 'GET'
            })

            if(!response.ok) {
                throw new Error('Something went wrong!!');
            }

            const responseData = await response.json(); 

            console.log('Hi I am fecth Orders method', responseData);

            const loadedOrders = []


            for (const key in responseData) {
                loadedOrders.push(new Order(
                    key,
                    responseData[key].cartItems,
                    responseData[key].cartTotalAmount,
                    new Date(responseData[key].date)
                ));
            }


            
            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            })
        } catch(error) {
            throw error;
        }
    }
};


export const addOrder = (cartItems, cartTotalAmount) => {
    return async (dispatch, getState) => {

        const date = new Date();

        const token = getState().auth.token;
        const userID = getState().auth.userID;

        const response = await fetch(`https://project-server-31dba.firebaseio.com/orders/${userID}.json?auth=${token}`, {   //fetch API can be used for GET, POST and even PUT methods.
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({        // body data provided to http request should be in the JSON format and JSON.stringify will convert the JS object or array to the JSON format.
                cartItems,
                cartTotalAmount,
                date: date.toISOString()
            })
        })

        if(!response.ok) {
            throw new Error('Something went wrong!!');
        }

        const responseData = await response.json();

        dispatch ({type: ADD_ORDER, orderData: {id: responseData.name, cartItems: cartItems, totalAmount: cartTotalAmount, date: date}});
    }
};
