import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import CacheBusting from './CacheBusting';
import BaseRouter from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  
  render(){
  return (
    
       <Router  basename="/knc">
          <BaseRouter/>
        </Router>

  );
  }
}

export default App;
