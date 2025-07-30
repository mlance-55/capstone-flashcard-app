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
        <div className="row">
          <h3 className="col">{deck.name}</h3>
          <p className="col">{deck.cards.length} cards</p>
        </div>

        <p>{deck.description}</p>
        <div className="row">
          <div className="col">
            <Link to={`/decks/${deck.id}`} className="btn">
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`}className="btn btn-blue">
              Study
            </Link>
          </div>
          <div className="col">
            <button onClick={() => deleteHandler(deck.id, { setDecks }, navigate)} className="btn btn-red">
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
      <Link className="row btn"to="/decks/new">
        Create Deck
      </Link>
      <div key="deckList">
        <div>{deckCards}</div>
      </div>
    </div>
  );
}

export default DeckList;