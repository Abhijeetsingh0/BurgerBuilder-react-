import React, { Component } from "react"; 
import Aux from "../../hoc/Auxl";
import Burger from "../../componenets/Burger/Burger";

class BurgerBuilder extends Component {

  state={
    ingredients : {
      salad:0,
      bacon:0,
      cheese:0,
      meat:0
    }
  }

  render() {
    return (
        <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <div>Build controler</div>
        </Aux>
    );
  }
}

export default BurgerBuilder;