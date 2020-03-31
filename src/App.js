import React from 'react';
import CardDeck from './CardDeck';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <header className="App-header">
          <h2>Deck Dealer</h2>
        </header>
        <CardDeck />
      </div>
    </div>
  );
}

export default App;
