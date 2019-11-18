import React, { Component } from 'react';
import Homepage from './Containers/Homepage';
import Checkout from './Containers/Checkout';
import {Route} from 'react-router-dom';

class App extends Component {
  render() { 
    return (     
        <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">SmartQ</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
         
        <div className="container-fluid">
          <Route path='/' exact component={Homepage}/>
          <Route path='/checkout' exact component={Checkout}/>
        </div>
      
        </div>      
    );
  }
}

export default App;





