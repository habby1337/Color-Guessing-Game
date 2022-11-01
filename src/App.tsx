import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


const getRandomHEXColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

enum Result {
  Correct,
  Wrong,
}


function App() {

  const [color, setColor] = useState<string>('');
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Result | undefined>(undefined);

  const [score, setScore] = useState<number>(0);
  const [life, setLife] = useState<number>(3);


  const generateColors = () => {
    const corretAnswer = getRandomHEXColor();
    setColor(corretAnswer)
    setAnswers([corretAnswer, getRandomHEXColor(), getRandomHEXColor()].sort(() => Math.random() - 0.5))
    setResult(undefined)
    
  }



  useEffect(() => {
    generateColors();
  }, []);

  const handleAnswerClick = (answer: string) => {
    if (answer === color) {
      
      setResult(Result.Correct)
      generateColors();

    } else {
      setResult(Result.Wrong)
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1><span style={{'color': color}}>HEX</span> color guessing</h1>
        <h3>
          {result === Result.Wrong && <>Wrong one!</>}
          {result === Result.Correct && <> You <span style={{'color': color}}>guessed </span> it!</>}
          {result === undefined && <>Which one?</>}
        </h3>
      </div>
      
      <div className="color-box"
      style={{
        backgroundColor: color,
        boxShadow: `0px 0px 50px 13px ${color}`
      }}>

      </div>

      <div className="buttons-container">
        {
          answers.map((answer, index) => (
            <button 
            onClick={() => handleAnswerClick(answer)} 
            key={index}>{answer}</button>
          ))
        }
        
      </div>
      <div className="game-info">
        <div className="score">
          <h3>Score</h3>
          <p>{score}</p>
          </div>
          <div className="life">
          <h3>Life</h3>
          <p>{life}</p>
          </div>
      </div>
     
     
    </div>
  )
}

export default App
