import React, { Component } from "react";
import axios from '../../../axios-order';
import Spinner from '../../../componenets/UI/Spinner/Spinner';
import Button from '../../../componenets/UI/Button/Button';
import './ContactData.css';
import Input from '../../../componenets/UI/Input/Input';

class ContactData extends Component {

    state={
        orderForm:{
            name:{
              elementType:'input',
              elementConfig:{
                type:'text',
                placeholder:'Your name'
              },
              value:''
            },
            street:{
              elementType:'input',
              elementConfig:{
                type:'text',
                placeholder:'Street'
              },
              value:''
            },
            zipcode :{
              elementType:'input',
              elementConfig:{
                type:'text',
                placeholder:'Zip-Code'
              },
              value:''
            },
            country:{
              elementType:'input',
              elementConfig:{
                type:'text',
                placeholder:'Country'
              },
              value:''
            },
            email:{
              elementType:'input',
              elementConfig:{
                type:'email',
                placeholder:'Your E-mail'
              },
              value:''
            },
            deliveryMethod : {
              elementType:'select',
              elementConfig:{
               options:[
                 {value:'fastest',displayValue:'Fastest'},
                 {value:'normal',displayValue:'Normal'}
               ]
              },
              value:''
            }
        },
        loading:false
    }

    orderHandler=(event)=>{
      event.preventDefault();
      this.setState({loading:true});
      const orderDetails = {
        ingredients: this.props.ingredients,
        price:this.props.price
      }
      axios.post("/orders.json",orderDetails)
      .then(res =>{
        this.setState({loading:false})
        this.props.history.push('/')
      }).catch(error=>
          {this.setState({loading:false})}
          );
    }

  inputChangeHandler= (event, inputIdentifyer) =>{
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifyer]
    }
    updatedFormElement.value = event.target.vlaue
    updatedOrderForm[inputIdentifyer] = updatedFormElement
    this.setState({orderForm:updatedOrderForm})
  }

  render() {
    const formElementsArray = []
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id:key,
        config : this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.inputChangeHandler} >
      {formElementsArray.map(formElement => (
        <Input 
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          vlaue={formElement.config.value}
          changed={(event) => this.inputChangeHandler(event,formElement.id)}
        />
      ))}
      <Button btnType='Success' >Order</Button>
      </form>
      )

    if(this.state.loading){
      form = <Spinner/>
    }
    return (
     <div className="contactData">
       <h4>Enter your contact details</h4>
        {form}
     </div>
    );
  }
}

export default ContactData ;