import React, { Component } from 'react';
import './checkout.css';
import axios from 'axios';

class Checkout extends Component {
    
    constructor(){
        super();
        this.state={
            items:[], 
            totalPrice:0,
            totalQty:0
      }
        
        
        this.componentDidMount= () =>{
            
            axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/smartQFood8bef5a2.json").then( response=>{
                const items= response.data;
                let itemId=0;
                const updatedItems= items.map(item=>{
                    itemId++;
                    return{
                        ...item,
                        id:itemId
                    }
                })
                this.setState({items:updatedItems});
                console.log(updatedItems);
                
                
              console.log(this.props);
              const query=new URLSearchParams(this.props.location.search);
              for(let param of query.entries())
              {
                  console.log(param);
                  if(param[0]==='totalPrice'){
                      this.setState({totalPrice:parseInt(param[1])})
                  }

                  let quantity=0;
                  const updatedItems= this.state.items.map(item =>{
                  if(item.itemname === param[0]){
                      item.qty= parseInt(param[1]);
                      quantity= quantity + parseInt(param[1]);
                  } 
                    this.setState({totalQty:quantity})   
                    return item;
                  });

                   this.setState({
                      items: [].concat(updatedItems),        
                  })  
               }          
            })  
        } 
        
        
        
        this.addItem= (id)=> {
              const updatedItems= this.state.items.map(item =>{
              if(item.id === id){
                  item.qty++; 
                  this.setState({
                    totalQty: this.state.totalQty +1,
                    totalPrice: this.state.totalPrice + item.price
                    })
              }     
                return item;
            });
              
              this.setState({
                  items: [].concat(updatedItems),        
              })
        }
        
          
          this.removeItem= (id)=> {
              const updatedItems= this.state.items.map(item =>{
                if(item.id === id){
                       if(item.qty > 0){
                           item.qty--;
                           this.setState({
                             totalPrice: this.state.totalPrice - item.price,
                             totalQty: this.state.totalQty -1
                            })
                       } 
                 }
                   return item;
                });
              
              this.setState({
                  items: [].concat(updatedItems),      
              })
          }
          
          
        
        
        this.handleCancelOrder=() =>{
        this.props.history.replace('/');
        }
        
        this.handleContinueOrder=()=>{
            window.alert("Your order has been placed.")
            this.props.history.replace('/');
        }    
     }
    
    
    

    render() {
        
        
        return (
            <div className="container">  
            <div className="row">
            <div className="col-sm-3 col-md-3 col-lg-4"></div>
            
            <div className="col-sm-6 col-md-6 col-lg-4">
            <div className="check-items"> 
            <h4>Your Order Details</h4>
            <hr/>
            {this.state.items.map(item=> {  
                if(item.qty>0){
                     return(
                         <div key={item.id}>
                         
                         <p>
                         <span className="bold">{item.itemname}</span>&nbsp;
                         <span>({item.qty})</span>
                         <span>
                         <button type="button" className="btn btn-danger float"
                         onClick= {()=>this.removeItem(item.id)}>-</button>
                         <button type="button" className="btn btn-success float" 
                         onClick={()=>this.addItem(item.id)}>+</button>
                         </span>
                         </p>   
                         <p>
                         <span>{item.qty} x {item.price}.00 Rs</span>
                         <span className="float">{item.qty * item.price}.00 Rs</span>
                         </p>
                         <hr/>
                         
                         </div>
                     )
                }
            })}
            <p><span className="bold">Subtotal:</span>
            <span className="float">{this.state.totalPrice}.00 Rs.</span>
            </p>
            <p><span className="bold">Taxes:</span>
            <span className="float">00.00 Rs.</span>
            </p>
            <hr/>
            <p><span className="bold">Grand Total:</span>
            <span className="float">{this.state.totalPrice}.00 Rs.</span>
            </p>
            <button type="button" className="btn btn-primary" onClick={this.handleContinueOrder}>Confirm Order</button>&emsp;
            <button type="button" className="btn btn-danger" onClick={this.handleCancelOrder}>Cancel Order</button>
            </div>
            </div>
        
            <div className="col-sm-3 col-md-3 col-lg-4"></div>
            </div>
            </div>
        );
  }   
}

export default Checkout;