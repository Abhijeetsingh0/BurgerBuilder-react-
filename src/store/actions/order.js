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
