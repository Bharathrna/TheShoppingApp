import moment from 'moment';

class Order {
    constructor(orderID, cartItems, totalAmount, date) {
        this.orderID = orderID;
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
        this.date = date;
    };

    get readableDate() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm');  // converts date object to a string format 
    }

};

export default Order;