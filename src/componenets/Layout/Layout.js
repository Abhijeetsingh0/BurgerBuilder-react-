import React,{Component} from 'react'
import Auxl  from '../../hoc/Auxl';
import "./Layout.css"; 
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDraws from "../Navigation/SideDraws/SideDraws";

class Layout extends Component{

    state={
        showSideDrawer:false
    }

    sideDrawsCloseHandler = () =>{
        this.setState({showSideDrawer:false});
    }

    menuTogglerHandler = () =>{
        this.setState({showSideDrawer:true});
    }

    render(){
        return(       
        <Auxl>
            <Toolbar MenuToggler={this.menuTogglerHandler}/>
            <SideDraws open={this.state.showSideDrawer} closed={this.sideDrawsCloseHandler} />
            <main className="content">
                {this.props.children}
            </main>
        </Auxl>

       )
    }
}

export default Layout
