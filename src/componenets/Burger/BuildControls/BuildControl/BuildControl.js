import React from 'react'
import "./BuildControl.css";

function BuildControls(props) {
    return (
        <div className="BuildControl">
            <div className="Label"> {props.label} </div>
            <button className="Less" onClick={props.Removed} disabled={props.disabled}>Less</button>
            <button className="More" onClick={props.Added}>Add</button>
        </div>
    )
}

export default BuildControls
