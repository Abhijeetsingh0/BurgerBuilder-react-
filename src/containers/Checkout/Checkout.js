import React, { Component } from "react"; 
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../componenets/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
//import { stat } from "fs-extra";

class Checkout extends Component {
  checkoutCancleHandler=()=>{
    this.props.history.goBack();
  }

  checkoutContinueHandler=()=>{
    this.props.history.replace('/checkout/contact-data')
  }

  render() {
    return (
     <div>
        <CheckoutSummary ingredients={this.props.ings}
        checkoutCancle={this.checkoutCancleHandler}
        checkoutContinue={this.checkoutContinueHandler}/> 
        <Route path={this.props.match.path + '/contact-data'} 
        component={ContactData} />    
     </div>
    );
  }
}

const mapStateToProps = state =>{
  return {
    ings : state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);