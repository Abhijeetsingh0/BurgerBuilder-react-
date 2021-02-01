import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';

const CheckoutSummary = (props) =>{
    return (
        <div className="CheckoutSummary">
            <h1>its your very own burger!</h1>  
            <div style={{width:'100%' ,margin:'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>     
                <Button btnType="Danger" clicked={props.checkoutCancle}>CANCEL</Button>
                <Button btnType="Success" clicked={props.checkoutContinue}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary

