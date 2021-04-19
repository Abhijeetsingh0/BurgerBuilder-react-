import React, { Component } from "react"; 
import {connect} from 'react-redux';
import Aux from "../../hoc/Auxl";
import Burger from "../../componenets/Burger/Burger";
import BuildContols from "../../componenets/Burger/BuildControls/BuildControls";
import Modal from "../../componenets/UI/Modal/Modal";
import OrderSummary from "../../componenets/Burger/orderSummary/orderSummary";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../componenets/UI/Spinner/Spinner";
import * as burgerBuilderAction from "../../store/action/index";

class BurgerBuilder extends Component {

  state={
    purchasing: false,
    loading:false
  }

  componentDidMount(){
    // axios.get('https://react-burger-build-17cdf-default-rtdb.firebaseio.com/ingredients.json')
    // .then(response => {
    //   this.setState({ingredients:response.data})
    // }).catch(err => console.error(err));
  }

  updatePurchaseHandler = (oldState ) =>{
    const sum = Object.keys(oldState).map(igkey=>{
      return oldState[igkey]
    }).reduce((sum,el)=>{
      return sum+el
    },0);
    return sum > 0;
  }

  purchasHandler = () =>{
    this.setState({purchasing:true})
  }

  purchasCancelHandler = () =>{
    this.setState({purchasing:false})
  }

  purchasContinueHandler = () =>{
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null; 

    let burger = <Spinner />

    if(this.props.ings){
      burger = (
        <Aux>
           <Burger ingredients={this.props.ings}/>
            <BuildContols 
            ingredientAdded = {this.props.onIngredinetAdded}
            ingredientRemoved = {this.props.onIngredinetRemoved}
            disabled= {disabledInfo}
            purchaseable = {this.updatePurchaseHandler(this.props.ings)}
            ordered = {this.purchasHandler} 
            price = {this.props.price}
            />
        </Aux>
      )
      orderSummary = <OrderSummary 
      totalsum = {this.props.price}
      ingredients = {this.props.ings}
      purchasCanceled = {this.purchasCancelHandler}
      purchasContinued = {this.purchasContinueHandler}
      />
    }

    if(this.state.loading){
      orderSummary = <Spinner />
    }

    return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchasCancelHandler}>
              {orderSummary}
            </Modal>
              {burger}
        </Aux>
    );
  }
}

const mapStateToProps = state =>{
  return{
    ings : state.ingredients,
    price : state.totalPrice
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onIngredinetAdded: (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
    onIngredinetRemoved: (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));