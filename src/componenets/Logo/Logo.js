import React from 'react';
import BurgerLogo from "../../assets/images/burger-logo.png";
import "./Logo.css"

const Logo = (props) => {
    return (
        <div className="logo">
            <img src={BurgerLogo} alt="myBurger" />
        </div>
    )
}

export default Logo
