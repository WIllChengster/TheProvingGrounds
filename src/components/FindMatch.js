import React from 'react';
import './FindMatch.css'

const FindMatch = (props) => {
    return (
        <div className="findMatch-container" >
            <p className="playerAmount">x many players looking for a game</p>
            <button className="findMatch-button" >Find match</button>
        </div>
    )
}

export default FindMatch