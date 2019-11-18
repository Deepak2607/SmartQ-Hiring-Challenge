import React, { Component } from 'react';
import './item.css';
import moment from 'moment';

class Item extends Component {

    render() {
        
        let availableTime= this.props.availabletime;
        let array = availableTime.split(","); 
        for(let i=0;i<array.length; i++){
            array[i]= array[i].split("-");
        }

        console.log(array);
        console.log(moment().format('HH:mm'));
        
        let isAvailable=false;
        let time="";
        time= moment().format('HH:mm');
        if( (time > array[0][0] && time < array[0][1]) || (time > array[1][0] && time < array[1][1]) ){
            isAvailable=true;
        }
        
        let current;
        if(isAvailable){
            current= "currently available";
        }else{
            current= "currently unavailable";
        }
        
        
        
        
        let button= null;
        if(this.props.qty==0){
            button=(
            <button disabled={!isAvailable} style={{float:'right'}} type="button" className="btn btn-success" onClick={this.props.addItem}>add</button> 
            )
        }
        else{
            button=(
            <div style={{float:'right'}}>
            <button type="button" className="btn btn-danger"
            onClick= {this.props.removeItem}>-</button>&ensp;
            <span>{this.props.qty}</span>&ensp;
            <button type="button" className="btn btn-success" 
            onClick={this.props.addItem}>+</button>
            </div>
            )
        }
     
    return (
        <div className="container-fluid">
        <div className="item">
        <p>
        <span> {this.props.itemname} </span> 
        <span style={{float:'right'}} > {this.props.price}.00 Rs. </span>
        </p>
        
        <p><span className="bold">availablility</span>
        - {array[0][0]}-{array[0][1]} & {array[1][0]}-{array[1][1]}
        </p>
        <p>{current} {button}</p>
        
        
        </div>
        </div>
    );
  }   
}

export default Item;