import React from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteHandler from "../common/HandleDelete";

//Displays all the deck on the home page
function DeckList({ decks, setDecks }) {
  const navigate = useNavigate();

  //mpa the deck into an array of jsx elements
  const deckCards = decks.map((deck) => {
    return (
      <div key={deck.id}>
        <div>
          <h3>{deck.name}</h3>
          <p>{deck.cards.length} cards</p>
        </div>

        <p>{deck.description}</p>
        <div>
          <div>
            <Link to={`/decks/${deck.id}`}>
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              Study
            </Link>
          </div>
          <div>
            <button onClick={() => deleteHandler(deck.id, { setDecks }, navigate)}>
              <span></span>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
  
  return (
    <div>
      <Link to="/decks/new">
        Create Deck
      </Link>
      <div key="deckList">
        <div>{deckCards}</div>
      </div>
    </div>
  );
}

export default DeckList;