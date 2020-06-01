import React from 'react'
import Clock from './Input/Clock';
import InputTextElement from '../elements/Input/InputTextElement'
import ScrollingText from '../elements/Layout/ScrollingText'
import Text from '../elements/Layout/Text'
import ImageScramble from '../elements/Input/ImageScramble'
import InputTextGroup from '../elements/Input/InputTextGroup'
import CrosswordInput from './Input/CrosswordInput'
import ARLocation from './Input/ARLocation'


const EType = {
    inputText: "inputText",
    inputTextGroup: "inputTextGroup",
    clock: "clock",
    geoLocation: "geoLocation",
    arLocation: "arLocation",
    scrollingText: "scrollingText",
    crossword: "crossword",
    imageScramble: "imageScramble",
    image: "image",
    video: "video",
    text: "text"
};

const PageElement = ({ element: { id, completed, type, content }, validation, onComplete, onChange }) => {
    
    let sharedProps = {completed, onComplete, onChange};
    console.log("pagelem", type, completed, validation);

    let element;
    switch (type) {
        case EType.inputText:
            // validated === completed for input text element
            element = <InputTextElement 
                        value={validation.value} validated={validation.validated} 
                        {...sharedProps} />
            break;
        case EType.clock:
            element = <Clock time={validation.value} validated={validation.validated} {...sharedProps} />
            break;
        case EType.scrollingText:
            element = <ScrollingText file={content} {...sharedProps} />;
            break;
        case EType.imageScramble:
            element = <ImageScramble imageUrl={content.imageUrl} squareSize={content.squareSize} {...sharedProps} />;
            break;
        case EType.arLocation:
            element = <ARLocation value={validation.value} validated={validation.validated} {...sharedProps} /> 
        case EType.inputTextGroup:
            element = <InputTextGroup values={validation.value} validated={validation.validated} {...sharedProps} />
            break;
        case EType.crossword:
            element = <CrosswordInput {...sharedProps} />
            break;
        case EType.text:     
        default:
            element = <Text content={content} {...sharedProps} />
    }
    return <div className='page-element'>
            {element}
           </div>

}


export default PageElement
