import Square from "./Square";
import { useState } from 'react';

function Board() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);
  const [step, setStep] = useState(0);
  let isWinner = false;
  let winner = null;
  let info = `Следующий - ${(isNextX) ? 'x' : 'o'}`;

  const checkWinner = () => {
    const winnerCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2]
    ];
    for(let combination of winnerCombinations){
      let [a, b, c] = combination;
      if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
        isWinner = true;
        return squares[a];
      }
    }
    console.log(step)
    if(step >= 9 && info.includes('Следующий')){
      info = 'Ничья';
      isWinner=true;
    }
    return null;
  }

  const setSquareValue = (i) => {
    setStep((step)=>step+1);
    if(isWinner) {
      window.location.reload();
      return;
    }
    if(squares[i]) return;
    let newSquares = squares.slice();
    newSquares[i] = (isNextX) ? 'x' : 'o';
    setIsNextX(!isNextX);
    setSquares(newSquares);
  }

  winner = checkWinner();
  if(winner) info = `Победитель - ${winner}`;

  return (
    <div>
      <h1>{info}</h1>
      {squares.map((square, index) => {
        return (
          <span key={index}>
            <Square value={square} setSquareValue={() => setSquareValue(index)} />
            {(index === 2 || index === 5) && <br />}
          </span>
        );
      })}
    </div>
  )
}

export default Board;