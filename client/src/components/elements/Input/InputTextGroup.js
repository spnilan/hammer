import React, { useEffect, createRef } from 'react'

const InputTextGroup = ({ values, validated, completed, onComplete, onChange }) => {

    const inputRefs = Array(values.length).fill("")
            .map((_, row) => {
                let wordLength = values[row].length;
                return Array(wordLength).fill("").map(_ => createRef());
            });

    const updateLetter = (newValue, row, col) => {
        let newValues = [...values];
        newValues[row]= [...values[row]];
        newValues[row][col] = newValue;

        let [nextCol, nextRow] = col + 1 < newValues[row].length ?
                                [col + 1, row] :
                                [0, (row + 1) % newValues.length];

        if (newValue !== "") {
            inputRefs[nextRow][nextCol].current.focus();
        }
        onChange(newValues);
    }

    useEffect(() => {
        if (validated && !completed) {
            onComplete();
        }
    }, [validated, completed, onComplete]);

    return (

        <div>
            {values.map((word, row) =>
                <div className='input-group' key={row} style={{ marginBottom: "10px" }} >
                    {word.map((letter, col) =>
                        <input ref={inputRefs[row][col]} type='text' maxLength='1'
                            className='form-control form-control-lg input-letter' disabled={validated}  
                            value={letter}
                            key={col}
                            style={{textTransform: 'uppercase', maxWidth: '3.2rem'}}
                            onChange={e => updateLetter(e.target.value, row, col) } />)
                    }
                </div>
            )}
        </div>
        
    )
}

export default InputTextGroup
 