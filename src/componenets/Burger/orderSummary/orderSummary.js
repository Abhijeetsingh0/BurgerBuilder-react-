import React from 'react'
import Aux from "../../../hoc/Auxl";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientsItem = Object.keys(props.ingredients).map((igkey,i) => {
        return(<li key={i}> <span style={{textTransform:"capitalize"}}>{igkey} </span>: {props.ingredients[igkey]} </li>)
    })
    return (
        <Aux className="oderSummary">
            <h3>Your order</h3>
            <p>Your Burger have following ingredients :- </p>
            <ul>
                {ingredientsItem}
            </ul>
            <h3>Your total price is: {props.totalsum.toFixed(2)}</h3>
            <p>Continue your order</p>
            <Button clicked={props.purchasCanceled} style={{color:"red"}}> CANCEL </Button>
            <Button clicked={props.purchasContinued}> CONTINUE </Button>
        </Aux>
    )
}

export default orderSummary;
