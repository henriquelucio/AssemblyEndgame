import React from "react"
import {languages} from "./languages"
import clsx from "clsx"
import { getFarewellText } from "./utils"

export default function AssemblyEndgame(){
    //State values
    const [currentWord, setCurrentWord] = React.useState("react")
    const [guessedLetters, setGuessedLetters] = React.useState([])

    //Derived values
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameOver = isGameLost || isGameWon
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)
    console.log(isLastGuessIncorrect)

    //Static value
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
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
            >
                {letter.toUpperCase()}
        </button>
            )   
        }
    )

    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    function addGuessedLetters(letter){
        setGuessedLetters(prevGuessed => 
            prevGuessed.includes(letter) ? prevGuessed : [...prevGuessed, letter]
        )
    }

    function renderGameStatus(){
        if(!isGameOver && isLastGuessIncorrect){
            return (
                <>
                    <p className="farewell-message">
                        {getFarewellText(languages[wrongGuessCount - 1].name)}
                    </p>
                </>
            )
        }

        if(isGameWon){
            return (
            <>
                <h2>You won!</h2>
                <p>Hit new game to play again</p>
            </>
            )
        }

        if(isGameLost){
            return (
            <>
                <h2>Game Over!</h2>
                <p>You lose! Better start learning Assembly</p>
            </>
            )
        }

        return null
    }
    
    return(
        <main>

            <header>
                <h1>Assembly Endgame</h1>
                <p>Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
            </header>

            <section 
                aria-live="polite"
                role="status"
                className={gameStatusClass}
            >
                {renderGameStatus()}
            </section>

            <section className="language-chips">
                {languagesElement}
            </section>

            <section className="word">
                {letterElements}
            </section>
            <section 
                className="sr-only"
                aria-live="polite"
                role="status"
            >
                <p>Current word: {currentWord.split("").map(letter =>
                guessedLetters.includes(letter) ? letter + "." : "blank.").join(" ")}</p>
            </section>

            <section className="keyboard">
                {keyboardElements}
            </section>

            {(isGameLost || isGameWon) &&<button className="new-game">
                New Game
            </button>}

        </main>
    )
}