import React from "react"
import {languages} from "./languages"
import clsx from "clsx"

export default function AssemblyEndgame(){
    //State values
    const [currentWord, setCurrentWord] = React.useState("react")
    const [guessedLetters, setGuessedLetters] = React.useState([])

    //Derived values
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    console.log(wrongGuessCount)

    const alphabet = "abcdefghijklmnopqrstuvwyxz"
    
    const languagesElement = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        /* const className = clsx("chip", isLanguageLost && "lost") */
        return (
        <span 
            className={`chip ${isLanguageLost ? "lost" : ""}`}
            style={styles} 
            key={lang.name}
        >{lang.name}</span>
    )})

    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>{guessedLetters.includes(letter) && letter.toUpperCase()}</span>
    ))

    const keyboardElements = alphabet.split("").map((letter) => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        return (
            <button 
                className={className}
                key={letter} 
                onClick={() => addGuessedLetters(letter)}
            >
                {letter.toUpperCase()}
        </button>
            )   
        }
    )

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
            <button className="new-game">
                New Game
            </button>
        </main>
    )
}