import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api";


function Study({ decks, setDecks }) {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]); 
  const [deck, setDeck] = useState({});
  const [currentCard, setCurrentCard] = useState(null); 
  const [displayCard, setDisplayCard] = useState(""); 
  const [isFront, setIsFront] = useState(true);
  const cardsLength = cards.length; 
  const navigate = useNavigate();

  //get current deck
  useEffect(() => {
    async function getDeck() {
      try {
        const deck = await readDeck(deckId);
        setDeck(deck);
        setCards(deck.cards);
        setCurrentCard(deck.cards[0]);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDeck();
  }, [deckId]); 


 //set currently displayed card
 function renderCard() {
  if (!currentCard) return null;

  return (
    <div>
       <h4>Card {cards.indexOf(currentCard) + 1} of {cards.length}</h4>
  {isFront ? (
    <div>
      <p>{currentCard.front}</p>
      <button onClick={handleFlip} className="btn">Flip</button>
    </div>
  ) : (
    <div>
      <p>{currentCard.back}</p>
      <button onClick={handleFlip} className="btn">Flip</button>
      <button onClick={handleNext} className="btn">Next</button>
    </div>
  )}
    </div>
  );
}


  //not enough cards
  const notEnoughCards = (
    <div>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cardsLength} cards in the
        deck.
      </p>
    </div>
  );
  
  //handle next button to switch to the next card
  function handleNext() {
    setIsFront(true);
    const currentIndex = cards.indexOf(currentCard);
    if (cards[currentIndex + 1]) {
      setCurrentCard(cards[currentIndex + 1]);
    } else {
      if (
        window.confirm(
          "Restart cards? Click cancel to return to the home page."
        )
      ) {
        setCurrentCard(cards[0]);
      } else {
        navigate("/");
      }
    }
  }

  //handle flip button
  function handleFlip() {
    setIsFront(!isFront);
  }


    //nav bar
    const navBar = (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`} >{deck.name}</Link>
          </li>
          <li className="breadcrumb-item">Study</li>
        </ol>
      </nav>
    );


  return (
    <div>
      {navBar}
      <h2>{deck.name}: Study</h2>
      {cardsLength < 3 ? notEnoughCards : renderCard()}
    </div>
  );
}

export default Study;