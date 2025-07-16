import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import NotFound from "../Layout/NotFound";

function Card({ decks }) {
    const { deckId } = useParams();
    const [ deck, setDeck ] = useState({});

    useEffect(() => {
        async function getDeck() {
            const currentDeck = await readDeck(deckId);
            setDeck(currentDeck);
        }
        getDeck();
    }, [decks]);

    return (
        <div>
            <Routes>
                <Route path="/new" element={<AddCard deck={deck}/>}/>
                <Route path=":cardId/edit" element={<EditCard deck={deck}/>}/>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}


export default Card;