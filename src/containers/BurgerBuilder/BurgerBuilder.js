import React, { Component } from "react"; 
import Aux from "../../hoc/Auxl";
import Burger from "../../componenets/Burger/Burger";
import BuildContols from "../../componenets/Burger/BuildControls/BuildControls";
import Modal from "../../componenets/UI/Modal/Modal";
import OrderSummary from "../../componenets/Burger/orderSummary/orderSummary";

const INGREDIENT_PRICES = {
  salad : 0.5,
  cheese : 0.4,
  meat : 1.3,
  bacon : 0.7
}

class BurgerBuilder extends Component {

  state={
    ingredients : {
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    },
    totalPrice : 4,
    isPurchasable:false,
    purchasing: false
  }

  updatePurchaseHandler = (oldState ) =>{
    const sum = Object.keys(oldState).map(igkey=>{
      return oldState[igkey]
    }).reduce((sum,el)=>{
      return sum+el
    },0);
    this.setState({isPurchasable:sum > 0});
  }

  addIngredientsHandler = (type)=>{
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice+priceAddition;
    this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    this.updatePurchaseHandler(updatedIngredients);
  }

  removeIngredient = (type) =>{
    const oldCount = this.state.ingredients[type];
    if(oldCount !== 0){
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      }
      updatedIngredients[type] = updatedCount;
      const priceDeducted = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice-priceDeducted;
      this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
      this.updatePurchaseHandler(updatedIngredients);
    }
   
  }

  purchasHandler = () =>{
    this.setState({purchasing:true})
  }

  purchasCancelHandler = () =>{
    this.setState({purchasing:false})
  }

  purchasContinueHandler = () =>{
    alert("You continued");
  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    return (
        <Aux>
            <Modal show={this.state.purchasing} modalClosed={this.purchasCancelHandler}>
              <OrderSummary 
                totalsum = {this.state.totalPrice}
                ingredients = {this.state.ingredients}
                purchasCanceled = {this.purchasCancelHandler}
                purchasContinued = {this.purchasContinueHandler}
              />
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildContols 
            ingredientAdded = {this.addIngredientsHandler}
            ingredientRemoved = {this.removeIngredient}
            disabled= {disabledInfo}
            purchaseable = {this.state.isPurchasable}
            ordered = {this.purchasHandler} 
            price = {this.state.totalPrice}
            />
        </Aux>
    );
  }
}

export default BurgerBuilder;