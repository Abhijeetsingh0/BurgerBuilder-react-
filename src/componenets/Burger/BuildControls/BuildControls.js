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
            {controls.map(ctrl => (
                <BuildControl key={ctrl.label} label={ctrl.label} Added={()=>props.ingredientAdded(ctrl.type)}/>
            ))}
        </div>
    )
}

export default BuildContols;