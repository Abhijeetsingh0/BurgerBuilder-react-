import React from "react";
import "./BuildControls.css"
import BuildControl from "./BuildControl/BuildControl";

const controls = [
    {label:"Salad",type:"salad"},
    {label:"Bacon",type:"bacon"},
    {label:"Cheese",type:"cheese"},
    {label:"Meat",type:"meat"}
]

const BuildContols = (props)=>{
    return(
        <div className="BuildContols">
            <p>Total Price = <b>{props.price.toFixed(2)}</b></p>
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label}
                Added={()=>props.ingredientAdded(ctrl.type)}
                Removed = {()=> props.ingredientRemoved(ctrl.type)}
                disabled= {props.disabled[ctrl.type]}
                />
            ))}
            <button className="OrderButton" onClick={props.ordered} disabled={!props.purchaseable}>ORDER NOW</button>
        </div>
    )
}

export default BuildContols;