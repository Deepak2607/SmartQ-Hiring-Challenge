import React, { Component } from 'react';
import Item from './Item';

class ItemsList extends React.Component {

    render() {        
        return (  
             <div>
               <div className="row">
                {this.props.items.map(item => (
                    <div id={item.id} className="col-sm-6 col-md-6 col-lg-4">
                    <Item itemname={item.itemname} price={item.price} qty={item.qty} availabletime={item.availabletime} removeItem={()=>this.props.removeItem(item.id)} addItem={()=>this.props.addItem(item.id)} />
                    </div>
                 ))} 
                </div>  
             </div>          
        );
  } 
}

export default ItemsList;
 
