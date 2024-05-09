import { ReactElement } from 'react';
import './StartScreen.css';

export default function StartScreen({ startGame }: any): ReactElement {
    return <>
    <div className='start'>
        <h1>Palavra Secreta</h1>
        <p>Clique no botão abaixo para começar a jogar.</p>
        <button onClick={startGame}>Novo Jogo</button>
    </div>
    </>;
}