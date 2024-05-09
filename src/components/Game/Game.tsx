import { ReactElement, useState, useRef, Fragment } from 'react';
import './Game.css';

interface GameProps {
    verifyLetter:   (letter: string) => void;
    word:           string;
    category:       string;
    letters:        string[];
    guessedLetters: string[];
    wrongLetters:   string[];
    guessesCount:   number;
    score:          number;
}

export default function Game(props: GameProps): ReactElement {
    const [letter, setLetter] = useState<string>('');
    const letterInputRef = useRef<any>(null);

    const handleSubmit = (event: any) => {
        event.preventDefault();

        props.verifyLetter(letter);
        setLetter('');
        if(letterInputRef.current) letterInputRef.current.focus();
    }

    return <>
    <div className='game'>
        <p className='points'>
            <span>Pontuação: {props.score}</span>
        </p>
        <h1>Advinhe a palavra:</h1>
        <h3 className='tip'>
            Dica sobre a palavra: <span>{props.category}</span>
        </h3>
        <p>Você ainda tem <span>{props.guessesCount}</span> tentativa(s).</p>
        <div className="wordContainer">
            {props.letters.map((letter: string, i: number) => (
                props.guessedLetters.includes(letter) 
                ? <span className='letter' key={i}>{letter}</span>
                : <div className="blankSquare" key={i}></div>
            ))}
        </div>
        <div className="letterContainer">
            <p>Tente adivinhar a letra da palavra:</p>
            <form onSubmit={handleSubmit}>
                <input 
                type        = 'text' 
                name        = 'letter' 
                maxLength   = {1} 
                value       = {letter}
                onChange    = {(e) => setLetter(e.target.value)}
                ref         = {letterInputRef}
                required 
                />
                <button type='submit'>Jogar!</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras erradas utilizadas:</p>
            <span>{props.wrongLetters.map((elem: string, index: number) => <Fragment key={index}>{elem}, </Fragment>)}</span>
        </div>
    </div>
    </>;
}