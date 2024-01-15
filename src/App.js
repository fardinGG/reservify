import React from 'react';
import ReservationForm from './components/ReservationForm';

import './App.css';

function App() {
  return (
    
    
    <div className="App">
    <div id="header">
      <nav>
      <img src="/images/logo.PNG" class="logo" alt="logo"></img>
                <ul id="sidemenu">
                    <li><a href="#header">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#contact">Contact</a></li>        
                </ul>
        </nav>
      </div>
      <h1 class="sub-title">RESERVIFY</h1>
      
      <ReservationForm />

    </div>
  );
}

export default App;