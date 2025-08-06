import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCard, createCard } from "../utils/api";
import ErrorMessage from "../common/ErrorMessage";

function CardForm({ deckId, card }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (card?.front !== undefined && card?.back !== undefined) {
    setFront(card.front);
    setBack(card.back);
  }
  }, [card]);

  console.log(card);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "front") {
      setFront(value);
    } else {
      setBack(value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (card) {
      const updatedCard = {
        ...card,
        front: front,
        back: back,
      };

      try {
        await updateCard(updatedCard);
      } catch (error) {
        console.log("error " + error);
      }
      navigate(-1);
    } else {
      try {
        await createCard(deckId, { front: front, back: back });
        navigate(0);
      } catch (error) {
        return <ErrorMessage />;
      }
    }
  }

  return (
    <form  className="col" onSubmit={handleSubmit}>
      <label className="col" htmlFor="name">
        Front
      </label>
      {card ? (
        <textarea
         className="col"
          name="front"
          onChange={handleChange}
          value={front}
          required
        />
      ) : (
        <textarea
          className="col"
          name="front"
          placeholder="Front side of card"
          onChange={handleChange}
          value={front}
          required
        />
      )}

      <label className="col" htmlFor="description">
        Back
      </label>
      {card ? (
        <textarea
          className="col"
          name="back"
          onChange={handleChange}
          value={back}
          required
        />
      ) : (
        <textarea
          className="col"
          placeholder="Back side of card"
          name="back"
          onChange={handleChange}
          value={back}
          required
        />
      )}

      {card ? (
        <>
          <Link to={`/decks/${deckId}`} className="btn btn-red">
            Cancel
          </Link>
          <button type="submit" name="save" className="btn">
            Submit
          </button>
        </>
      ) : (
        <>
          <Link to={`/decks/${deckId}`} className="btn">
            Done
          </Link>
          <button type="submit" name="save" className="btn btn-blue">
            Save
          </button>
        </>
      )}
    </form>
  );
}

export default CardForm;