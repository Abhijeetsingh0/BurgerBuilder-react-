import React, { Component } from "react"; 
import Aux from "../../hoc/Auxl";
import Burger from "../../componenets/Burger/Burger";
import BuildContols from "../../componenets/Burger/BuildControls/BuildControls";
import Modal from "../../componenets/UI/Modal/Modal";
import OrderSummary from "../../componenets/Burger/orderSummary/orderSummary";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../componenets/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad : 0.5,
  cheese : 0.4,
  meat : 1.3,
  bacon : 0.7
}

class BurgerBuilder extends Component {

  state={
    ingredients :null,
    totalPrice : 4,
    isPurchasable:false,
    purchasing: false,
    loading:false
  }

  componentDidMount(){
    axios.get('https://react-burger-build-17cdf-default-rtdb.firebaseio.com/ingredients.json')
    .then(response => {
      this.setState({ingredients:response.data})
    }).catch(err => console.error(err));
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
    //alert("You continued");
    const queryParams = []
    for(let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname:'/checkout',
      search: '?' + queryString
    });

  }

  render() {

    const disabledInfo = {
      ...this.state.ingredients
    }
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    let orderSummary = null; 

    let burger = <Spinner />

    if(this.state.ingredients){
      burger = (
        <Aux>
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
      )
      orderSummary = <OrderSummary 
      totalsum = {this.state.totalPrice}
      ingredients = {this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder,axios);