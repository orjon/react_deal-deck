import React, { Component } from 'react'
import axios from 'axios';
import Card from './Card';
import './CardDeck.css';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class CardDeck extends Component {
  constructor(props){
    super(props);
    this.state = {
      deck: null,
      drawnCards: [],
      deckId: 'fetching...'
    }
    this.getCard = this.getCard.bind(this);
  }

  async getCard(){
    let deckId = this.state.deckId;
    try{
      let cardUrl = `${API_BASE_URL}/${deckId}/draw`
      let card_response = await axios.get(cardUrl)
      let success = card_response.data.success;
      if (!success) {
        throw new Error('No cards remaining')
      }
      console.log(card_response.data)
      let card = card_response.data.cards[0];
      let angleRand = Math.random()*15-7.5;
      let posXRand = (Math.random()*30)-15;
      let posYRand = (Math.random()*10)-5;
      let transform = `translate(${posXRand}px, ${posYRand}px) rotate(${angleRand}deg)`
    
      this.setState(st => ({
        drawnCards: [
          ...st.drawnCards,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} ${card.suit}`,
            transform: transform
          }
        ]
      }));
    } catch(err) {
      alert(err)
    }
  }


  async componentDidMount(){
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle`)
    console.log(deck)
    this.setState({deck: deck.data, deckId: deck.data.deck_id})
  }


  render(){
    const cards  = this.state.drawnCards.map(card => 
      <Card key={card.id} image={card.image} name={card.name} transform={card.transform}/>
    );

    return(
      <div className='CardDeck'>
        <button onClick={this.getCard}>Deal!</button>
        <div className='Cards'>
          {cards}
        </div>
      </div>

    )
  }
}

export default CardDeck