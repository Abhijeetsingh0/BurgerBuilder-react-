import React, { Component } from "react";
import axios from '../../../axios-order';
import Spinner from '../../../componenets/UI/Spinner/Spinner';
import Button from '../../../componenets/UI/Button/Button';
import './ContactData.css';

class ContactData extends Component {

    state={
        name:'',
        email:'',
        address:{
            street:'',
            pincode:''
        },loading:false
    }

    orderHandler=(event)=>{
      event.preventDefault();
      this.setState({loading:true});
      const orderDetails = {
        ingredients: this.props.ingredients,
        price:this.props.price,
        costmer:{
          name:"abhijeet",
          email:"ansih@gmail.com"
        }
      }
      axios.post("/orders.json",orderDetails)
      .then(res =>{
        this.setState({loading:false})
        this.props.history.push('/')
      }).catch(error=>
          {this.setState({loading:false})}
          );
    }

  render() {

    let form = (
      <form >
      <input type='text'  className='Input' name='name' placeholder='name'/>
      <input type='email' className='Input'  name='email' placeholder='email'/>
      <input type='text'  className='Input' name='street' placeholder='street'/>
      <input type='text'  className='Input' name='pincode' placeholder='pincode'/>
      <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
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