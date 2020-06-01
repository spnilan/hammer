import React, {useEffect} from 'react'

const InputTextElement = ({value, validated, completed, onComplete, onChange }) => {

    ///let [text, setText] = useState('')
    //const onChange = e => setText(e.target.value)

    useEffect(() => {
        if (validated && !completed) {
            onComplete();
        }
    }, [validated, completed, onComplete]);

    return (
        <input type='text' className='form-control form-control-lg' disabled={validated} value={value} onChange={e => onChange(e.target.value)}>
        </input>
    )
}

export default InputTextElement
