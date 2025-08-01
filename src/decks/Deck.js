import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import  HandleDelete from "../common/HandleDelete";
import { deleteCard, readDeck, listDecks } from "../utils/api";


function Deck({ decks, setDecks, deck, setDeck}) {
  const { deckId } = useParams();
  const navigate = useNavigate({});
  const [cards, setCards] = useState([]);
  const [navBar, setNavBar] = useState("");

  //retrieve list of cards
  useEffect(() => {
    async function getCards() {
      try {
        const deck = await readDeck(deckId);
        setCards(deck.cards);
      } catch (error) {
        console.log(error.message);
      }
    }
    getCards();
  }, [decks]);

  //handle delete card
  async function HandleDeleteCard(id){
    if(window.confirm("Delete this card?")) {
      await deleteCard(id)
      const updatedDeckList = await listDecks();
      setDecks(updatedDeckList);
    }
  }

  //generate card list
  const cardsList = cards.map((card) => {
    return (
      <div className="list-group-item">
        <div className="row">
          <p className="col">{card.front}</p>
          <p className="col">{card.back}</p>
        </div>
        <div className="cardSubtitle">
          <Link to={`cards/${card.id}/edit`} className="btn">
            Edit
          </Link>
          <button className="btn btn-red" onClick={() => HandleDeleteCard(card.id)}>Delete</button>
        </div>
      </div>
    );
  });
  

  //render navbar when deck is loaded
  useEffect(() => {
    async function getNavBar() {
      try {

        setNavBar(
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">{deck.name}</li>
            </ol>
          </nav>
        );
      } catch (error) {
        console.log(error.message);
      }
    }
    getNavBar();
  }, [decks]);

  return (
    <div>
      {deck && (
        <div>
          {navBar}
          <h1>{deck.name}</h1>
          <p>{deck.description}</p>
          <div className="row">
            <div className="col">
              <Link to="edit" className="btn">
                Edit
              </Link>
              <Link to="study" className="btn btn-blue">
                Study
              </Link>
              <Link to="cards/new" className="btn">
                Add Card
              </Link>
            </div>
            <div>
              <div className="col">
                <button onClick={() => HandleDelete(deck.id, { setDecks }, navigate)} className="btn btn-red">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Flashcards */}
      <div>
        <div>{cardsList}</div>
      </div>
    </div>
  );
}

export default Deck;