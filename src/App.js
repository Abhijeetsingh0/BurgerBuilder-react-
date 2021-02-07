import React, { Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import Layout from './componenets/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        react app
        <Layout>
          <Switch>
          <Route path='/' exact component={BurgerBuilder} />
          <Route path='/Orders' component={Orders} />
          <Route path='/checkout' component={Checkout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
