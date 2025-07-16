import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createDeck, listDecks } from "../utils/api";

//Page to Create a deck and add it to the decks array
function CreateDeck({ setDecks }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const navBar = (
    <nav>
      <ol>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/decks/new">Create Deck</Link>
        </li>
      </ol>
    </nav>
  );

  //handle submit
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await createDeck({ name: name, description: description });
      console.log("created");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  //handle input change
  const handleChange = (event) => {
    if (event.target.placeholder == "Name") {
      setName(event.target.value);
      console.log("name: " + name);
    } else {
      setDescription(event.target.value);
      console.log("descriptioin: " + description);
    }
  };

  //fetch list of decks from API
  useEffect(() => {
    async function getDecks() {
      try {
        const deckList = await listDecks();
        setDecks(deckList);
      } catch (error) {
        console.log(error.message);
      }
    }
    getDecks();
  }, [handleSubmit]);

  return (
    <div>
      {navBar}
      <h1>Create Deck</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
        </label>
        <input
          placeholder="Name"
          type="text"
          onChange={handleChange}
          value={name}
          required
        />
        <label htmlFor="description">
          Description
        </label>
        <textarea
          placeholder="Brief description of the deck"
          onChange={handleChange}
          value={description}
          required
        />

        <Link to="/">
          Cancel
        </Link>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;