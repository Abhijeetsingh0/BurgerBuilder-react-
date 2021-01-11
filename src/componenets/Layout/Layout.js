import React from 'react'
import Auxl  from '../../hoc/Auxl';
import "./Layout.css"; 
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDraws from "../Navigation/SideDraws/SideDraws";

const Layout = (props) => {
    return (
        <Auxl>
            <Toolbar />
            <SideDraws />
            <main className="content">
            {props.children}
        </main>
        </Auxl>
        
    )
}

export default Layout
