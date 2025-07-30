import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck, updateDeck, listDecks } from "../utils/api";
import { useState, useEffect } from "react";

function EditDeck({ setDecks }) {
  const { deckId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deckName, setDeckName] = useState("");
  const [deck, setDeck] = useState({});
  const navigate = useNavigate();

  //retrieve deck to edit
  useEffect(() => {
    async function getDeck() {
      const deck = await readDeck(deckId);
      setDeck(deck);
      setName(deck.name);
      setDeckName(deck.name);
      setDescription(deck.description);
    }
    getDeck();
  }, [deckId]);

  const navBar = (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deckName}</Link>
          </li>
          <li className="breadcrumb-item">Edit Deck</li>
        </ol>
      </nav>
    </div>
  );

  //update value on input change
  function handleChange(event) {
    const name = event.target.name;
    if (name === "name") {
      setName(event.target.value);
    } else {
      setDescription(event.target.value);
    }
  }

  //Update card
  async function handleSubmit(event) {
    event.preventDefault();
    const newDeck = {
      id: deckId,
      name: name,
      description: description,
    };

    await updateDeck(newDeck);
    const deckList = await listDecks();
    setDecks(deckList);
    navigate(`/decks/${deckId}`);
  }


  return (
    <div>
      {navBar}
      <h1>Edit Deck</h1>

      <form className="col" onSubmit={handleSubmit}>
        <label className="col" htmlFor="name">
          Name
        </label>
        <input
          className="col"
          placeholder="Name"
          name="name"
          type="text"
          onChange={handleChange}
          value={name}
          required
        />
        <label className="col" htmlFor="description">
          Description
        </label>
        <textarea
          className="col"
          placeholder="Brief description of the deck"
          name="description"
          onChange={handleChange}
          value={description}
          required
        />

        <Link to={`../${deckId}`} className="btn btn-red">
          Cancel
        </Link>
        <button type="submit" className="btn btn-blue">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;