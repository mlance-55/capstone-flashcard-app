import React from "react";
import { readCard, updateCard, listDecks, readDeck } from "../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CardForm from "./CardForm";

function EditCard({ deck }) {
  const { cardId, deckId } = useParams();
  const [card, setCard] = useState({});

  useEffect(() => {
    async function getCard() {
      const card = await readCard(cardId);
      setCard(card);
    }
    getCard();
  }, [deck]);


  const navBar = (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`} state={deck}>
              {deck.name}
            </Link>
          </li>
          <li className="breadcrumb-item">Edit Card</li>
        </ol>
      </nav>
    </div>
  );

  return (
    <div>
      {navBar}
      <h1>Edit Card</h1>
      <CardForm card={card} deckId={deckId}/>
    </div>
  );
}

export default EditCard;