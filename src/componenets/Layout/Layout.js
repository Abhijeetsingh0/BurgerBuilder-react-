import React from 'react'
import Auxl  from '../../hoc/Auxl';
import classes from "./Layout.css"; 

const Layout = (props) => {
    return (
        <Auxl>
            <div>
            layout sidebar nav bar
        </div>
        <main className="content">
            somthing is here
            {props.children}
        </main>
        </Auxl>
        
    )
}

export default Layout
