import React from 'react'
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./SideDraws.css";

const SideDraws = () => {
    //...
    return (
        <div className="SideDrawer">
            <div className="Logo">
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
}

export default SideDraws
