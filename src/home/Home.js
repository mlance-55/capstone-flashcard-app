import React from 'react';
//import { Route, Routes, Link } from "react-router-dom";
import DeckList from "./DeckList.js";

//Home Page
function Home({decks, setDecks}){
    return(
        <div className="col">
            <DeckList decks={decks} setDecks={setDecks}/>
        </div>
    )
}



export default Home;