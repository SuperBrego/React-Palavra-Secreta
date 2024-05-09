// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// Data
import { wordsList } from './data/words';

// Componentes
import StartScreen from './components/StartScreen/StartScreen';
import Game from './components/Game/Game';
import GameOver from './components/GameOver/GameOver';

interface GameStage {
  id: number;
  name: string;
}

// Variáveis
const stages: GameStage[] = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'over' }
]

function App() {
  const [currStage, setCurrStage] = useState<Number>(stages[0].id);
  // const [stageName, setStageName] = useState<string>(stages[0].name);
  const [sortedWord, setSortedWord] = useState<string>('');
  const [sortedCategory, setSortedCategory] = useState<string>('');
  const [letters, setLetters] = useState<string[]>([]);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [guessesCount, setGuessesCount] = useState<number>(3);
  const [score, setScore] = useState<number>(0);
  
  useEffect(() => {
    let uniqueLetters: string[] = [... new Set(letters)];

    if(uniqueLetters.length === guessedLetters.length) {
      // Pontuar
      setScore((currScore: number) => currScore + (100 * guessesCount));

      // Reseta
      startGame();
    }

  }, [guessedLetters]);

  /**
   * Escolhe uma categoria e palavra aleatória para ser advinhada.
   */
  const choseWordAndCategory = () => {
    let categories = Object.keys(wordsList);
    let category = categories[Math.floor(Math.random() * categories.length)];
    let word = wordsList[category][Math.floor(Math.random() * wordsList[category].length)];
    return {word, category};
  }

  const startGame = useCallback(() => { 
    // setLetters([]);
    let { word, category } = choseWordAndCategory();
    
    // Separar as letras
    let letterList: string[] = word.split('');
    letterList = letterList.map((letter: string) => letter.toLowerCase());

    // Definir os Estados
    setSortedWord(word);
    setSortedCategory(category);
    setLetters(letterList);

    console.log(`Palavra atual é: ${word}`);

    // Limpar Itens
    setGuessedLetters([]);
    setWrongLetters([]);

    setCurrStage(stages[1].id); 
  }, []);


  const verifyLetter = (letter: string) => { 
    letter = letter.toLocaleLowerCase();
    let guessCount = guessesCount;

    // Se já foi usada a letra, voltar.
    if(guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;
    
    // Se a letra está certa
    if(letters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    }
    else {
      setWrongLetters([...wrongLetters, letter]);
      guessCount--;
      setGuessesCount(guessCount);
    }

    if(guessCount === 0) setCurrStage(stages[2].id); 
  }

  const retry = () => { 
    setGuessesCount(3);
    setScore(0);

    setCurrStage(stages[0].id); 
  }

  return (
    <>
      <div className='App'>
        {currStage === 1 && <StartScreen startGame={startGame} />}
        {currStage === 2 && <>
          <Game 
          verifyLetter  = {verifyLetter} 
          word          = {sortedWord}
          category      = {sortedCategory}
          letters       = {letters}
          guessedLetters= {guessedLetters}
          wrongLetters  = {wrongLetters}
          guessesCount  = {guessesCount}
          score         = {score}
          />
        </>}
        {currStage === 3 && <>
          <GameOver 
          word  = {sortedWord}
          score = {score}
          retry = {retry} 
          />
        </>}
      </div>
    </>
  )
}

export default App;