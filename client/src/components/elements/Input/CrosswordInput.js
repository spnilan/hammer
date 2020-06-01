import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Crossword from '@jaredreisinger/react-crossword';
import { isEqual } from 'lodash';

const data = {
  across: {
    3: {
      clue: "What I said when you were about to come over",
      answer: "BRINGGIRLS",
      row: 2,
      col: 0,
    },
    5: {
      clue: "Where I live",
      answer: "ONHOWARD",
      row: 5,
      col: 1
    }
  },
  down: {
    1: {
      clue: "You _____ me like tea _____ my favorite cup",
      answer: "FILLED",
      row: 0,
      col: 8
    },
    2: {
      clue: "What you'll need to get to another universe",
      answer: 'PROTONPUMP',
      col: 1,
      row: 1,
    },
    4: {
      clue: "Where we met",
      col: 6,
      row: 2,
      answer: "INMAPS"
    } 
  }
};



let crosswordMap = {};

for (let i = 0; i < Object.values(data.across).length; i++) {
  let {row, col, answer} = Object.values(data.across)[i];
  crosswordMap[row] = crosswordMap[row] || {};
  for (let j = 0; j < answer.length; j++) {
    crosswordMap[row][col + j] = answer[j];
  }
}

for (let i = 0; i < Object.values(data.down).length; i++) {
  let {row, col, answer} = Object.values(data.down)[i];
  for (let j = 0; j < answer.length; j++) {
    crosswordMap[row + j] = crosswordMap[row + j] || {};
    crosswordMap[row + j][col] = answer[j];
  }
}





const CrosswordInput = ({ completed, onComplete }) => {


  const [crossword, setCrossword] = useState({});
  const [crosswordLoaded, setCrosswordLoaded] = useState(false);
  const crosswordRef = useRef();

  const onCellChange = (row, col, character) => {
    console.log("cell", row, col, character);
    setCrossword(cword => ({
      ...cword,
          [row]: {
            ...cword[row],
            [col]: character
          }
    }));
  }

  const removeEditing = (e) => {

    //console.log("hello", crosswordCorrect)
    e.preventDefault();
    e.stopPropagation();
  }

  const crosswordCorrect = isEqual(crossword, crosswordMap);


  useEffect(() => {

    if (!completed) {
      onComplete();
    }
    let capturedRef = crosswordRef.current;
    if (crosswordCorrect && capturedRef) {
      capturedRef.addEventListener("keydown", removeEditing, true);
    }
    return () => {
      if (capturedRef) {
        capturedRef.removeEventListener("keydown", removeEditing, true);
      }
    }
  }, [crosswordCorrect])

  useEffect(() => {
    
    let guessData = { date: Date.now(), guesses: {} };
    if (completed) {
      for (let i = 0; i < Object.entries(crosswordMap).length; i++) {
        let [row, colValues] = Object.entries(crosswordMap)[i];
        for (let j = 0; j < Object.entries(colValues).length; j++) {
          let [col, value] = Object.entries(colValues)[j];
          guessData.guesses[`${row}_${col}`] = value;
        }
      }
      console.log("data", guessData);
      window.myguesses = guessData;
      localStorage.setItem("guesses", JSON.stringify(guessData));
      console.log("just stored", localStorage.getItem("guesses"));
    }
/*
    if (localStorage.getItem("guesses") && localStorage.getItem("guesses") !== "") {
      let guesses = JSON.parse(localStorage.getItem("guesses")).guesses;
      let newCrossword = {};
      for (let i = 0; i < Object.entries(guesses).length; i++) {
        let [key, val] = Object.entries(guesses)[i];
        let [row, col] = key.split("_");
        newCrossword[row] = newCrossword[row] || {};
        newCrossword[row][col] = val
      }
      setCrossword(newCrossword);
    }
*/
    setCrosswordLoaded(true);
  }, []);


    return crosswordLoaded &&
          <div ref={crosswordRef}>
            <span>Correct: {crosswordCorrect ? "true" : "false"} </span>
            <Crossword data={data} useStorage={true} onCellChange={onCellChange} />
          </div>
}


export default CrosswordInput
