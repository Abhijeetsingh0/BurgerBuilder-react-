import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const PurchaseBurgerSucess = (id ,orderData) =>{
    return {
        type : actionTypes.PURCHASE_BURGER_SUCESS,
        orderId : id,
        orderData : orderData
    }
}

export const PurchaseBurgerFail = (error) =>{
    return{
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const PurchaseBurgerStart = () =>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const PurchaseBurger = (orderData) =>{
    return dispatch =>{
        dispatch (PurchaseBurgerStart());
        axios.post( '/orders.json', orderData )
        .then( response => {
          dispatch(PurchaseBurgerSucess(response.data.name , orderData ));
        } )
        .catch( error => {
            dispatch(PurchaseBurgerFail(error));
        } );
    }
}

export const purchaseInit = () =>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) =>{
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orders : orders
    }
}

export const fetchOrderFail = (error) =>{
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}

export const fetchOrderStart = () =>{
    return{
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch=>{
        dispatch(fetchOrderStart())
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrderFail(err));
        });
    }
}