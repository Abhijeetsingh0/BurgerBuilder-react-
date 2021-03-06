import React, { Component } from 'react';
import { Route, Switch  , withRouter , Redirect} from 'react-router-dom';
import {connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSinin();
  }
  
  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={auth} />
        <Route path="/" exact component={BurgerBuilder } />
        <Redirect to="/" />
      </Switch>

    );
    if(this.props.isAuthenticated){
      routes = (
        <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Switch>
      ); 
    }
    return (
      <div>
        <Layout>
         {routes} 
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSinin : () => dispatch(actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
