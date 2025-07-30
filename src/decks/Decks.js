import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import CreateDeck from "./CreateDeck";
import NotFound from "../Layout/NotFound";
import DeckIdRoutes from "./DeckIdRoutes";

function Decks({decks, setDecks}) {

    return (
        <div>
            <Routes>
                <Route path="/new" element={<CreateDeck setDecks={setDecks}/>}/>
                <Route path="/:deckId/*" element={<DeckIdRoutes decks={decks} setDecks={setDecks}/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default Decks;                