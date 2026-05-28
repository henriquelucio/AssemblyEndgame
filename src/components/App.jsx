import React from "react"
import {languages} from "./languages"
import clsx from "clsx"

export default function AssemblyEndgame(){
    const [currentWord, setCurrentWord] = React.useState("react")
    const [guessedLetters, setGuessedLetters] = React.useState([])
    console.log(guessedLetters)

    const alphabet = "abcdefghijklmnopqrstuvwyxz"
    
    const languagesElement = languages.map(lang => {
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        return (
        <span 
            className="chip" 
            style={styles} 
            key={lang.name}
        >{lang.name}</span>
    )})

    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>{letter.toUpperCase()}</span>
    ))

    const keyboardElements = alphabet.split("").map((letter) => (
        <button 
            key={letter} 
            onClick={() => addGuessedLetters(letter)}
        >
            {letter.toUpperCase()}
        </button>
    ))

    function addGuessedLetters(letter){
        setGuessedLetters(prevGuessed => 
            prevGuessed.includes(letter) ? prevGuessed : [...prevGuessed, letter]
        )
    }
    
    return(
        <main>
            <header>
                <h1>Assembly Endgame</h1>
                <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
            </header>
            <section className="game-status">
                <h2>You won!</h2>
                <p>Hit new game to play again</p>
            </section>
            <section className="language-chips">
                {languagesElement}
            </section>
            <section className="word">
                {letterElements}
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            <button>New Game</button>
        </main>
    )
}