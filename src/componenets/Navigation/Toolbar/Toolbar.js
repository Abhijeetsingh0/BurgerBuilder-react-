import React from 'react';
import "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Menu from "../SideDraws/DrawerToggler/DrawerToggler";

const Toolbar = (props) => {
    return (
        <header className="Toolbar">
            <Menu clicked={props.MenuToggler}/>
            <div style={{height:'80%'}}>
                <Logo />
            </div>
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
