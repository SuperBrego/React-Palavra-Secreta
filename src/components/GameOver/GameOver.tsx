import { ReactElement } from 'react';
import './GameOver.css';

interface GameOverProps {
    word: string;
    score: number;
    retry: () => void;
}

export default function GameOver(props: GameOverProps): ReactElement {
    return <>
    <div>
        <h1>Fim de Jogo</h1>
        <p>A última palavra era <b>{props.word}</b>.</p>
        <h2>Sua pontuação final foi <span>{props.score}</span>.</h2>
        <button onClick={props.retry}>Tentar novamente?</button>
    </div>
    </>;
}