import React, { Component } from 'react';
import ItemsList from '../Components/Items/ItemsList';
import Cart from '../Components/Cart/Cart';
import axios from 'axios';

class Homepage extends Component {
  
    constructor(){
        super();
        
    this.state={
      items:[],
      totalPrice:0,
      totalQty:0,
      }
        
        
        this.componentDidMount=()=> {
            
            axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/smartQFood8bef5a2.json").then( response=>{
                const items= response.data;
                let itemId=0;
                const updatedItems= items.map(item=>{
                    itemId++;
                    return{
                        ...item,
                        qty:0,
                        id:itemId     
                    }
                })
                this.setState({items:updatedItems});
                console.log(updatedItems);
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
          
          
          this.continuePurchase=()=> { 
              
              console.log(this.props);
              const params=[];
              {this.state.items.map(item =>
                  params.push(item.itemname +'='+ item.qty)
                 )}
              params.push('totalPrice' +'='+ this.state.totalPrice )
              
              const string=params.join('&');
              this.props.history.push({
                  pathname:'/checkout',
                  search:string
              });
                    
              this.setState({
                  items:[],
                  totalPrice:0,
                  totalQty:0
              })
          }
          
          
          this.sortByPriceAsc=()=>{
              
              let sortedItems;
              sortedItems= this.state.items.sort((a,b)=>{
                 return parseInt(a.price)  - parseInt(b.price);
              })
              
              this.setState({
                  items:sortedItems
              })
          }
          
          this.sortByPriceDsc=()=>{
              
              let sortedItems;
              sortedItems= this.state.items.sort((a,b)=>{
                 return parseInt(b.price)  - parseInt(a.price);
              })
              
              this.setState({
                  items:sortedItems
              })
          }
          
    }
    
    render(){
        
    return (
        <div className="container">
        <div className="buttons">
        <button type="button" className="btn btn-success" onClick={this.sortByPriceAsc}>Sort in Asc. order</button>&nbsp;
        <button type="button" className="btn btn-success" onClick={this.sortByPriceDsc}>Sort in Dsc. order</button>
        </div>
        
        <ItemsList removeItem={this.removeItem} addItem={this.addItem} totalPrice={this.state.totalPrice} totalQty={this.state.totalQty} items={this.state.items} />
        <Cart removeItem={this.removeItem} addItem={this.addItem} totalPrice={this.state.totalPrice} totalQty={this.state.totalQty} items={this.state.items} continuePurchase={this.continuePurchase} />
        </div>
    
    );
  }
}

export default Homepage;

