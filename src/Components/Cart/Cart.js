import React, { Component } from 'react';
import './cart.css';

class Cart extends Component {
    
    render() {
        
        return (
            <div className="container-fluid">  
            <div className="cart1"> 
            <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-4">
            {this.props.items.map(item=> {  
                if(item.qty>0){
                      return <p key={item.id}>{item.itemname} x {item.qty}</p>  
                }
            })}
            </div>
            
            <div className="col-md-2"></div>
            <div className="col-md-4">
            <p> <span>Total:</span>&nbsp;
            {this.props.totalPrice}.00 Rs.
            </p>
            <button disabled={this.props.totalPrice===0} type="button" className="btn btn-info" onClick={this.props.continuePurchase}>Checkout</button>
            </div>
            </div>
            </div>
            </div>
        );
  }   
}

export default Cart;