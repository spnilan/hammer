import React, { useState,  useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { loadQuestPage, completeElement, validateElement, getHint } from '../../actions/questPage';
import PageElement from '../elements/PageElement'
import Loading from '../layout/Loading'

const QuestPage = ({page : { elements, loading, timeStarted, hint, completed }, 
                    match,
                    loadQuestPage, validateElement, completeElement, getHint } ) => {

    let questId = match.params.questId;
    let pageId = match.params.pageId;
    const [inputs, setInputs] = useState({
        loading: true,
        values: {}
    });

    
    const onChange = elementId => (value) => {
        let element = elements.find(elem => elem.id === elementId);
        if (element.completed) {
            return;
        }
        console.log("onchange", elementId, value);
        let eid = elementId.toString();     
        setInputs(inputs => {
            return {
                loading: false,
                values: {
                    ...inputs.values,
                    [eid]: {
                        ...inputs.values[eid],
                        value: value
                    }

                }
            }
        });
        //console.log("validating....", elementId, value);
        validateElement(questId, pageId, elementId, value);
    }
    
    const onComplete = (elementId) => {
        console.log("oncomplet!!!!!", elementId);
        completeElement(questId, pageId, elementId)
    }


    const backToMap = (
        <div className='page-element'>
            <p className='lg-text'>You got it! Nice going!</p>
            <Link to={`/quest/${questId}`}>
                <button type='submit' className='btn btn-primary btn-lg' style={{fontSize: "2rem"}}>
                    <i className="fas fa-arrow-alt-circle-left"></i>
                    &nbsp;
                    Back to map
                </button>
            </Link>
        </div>
    )


    useEffect(() => {
        loadQuestPage(questId, pageId);
    }, [loadQuestPage, questId, pageId])

    useEffect(() => {
        if (!timeStarted || !questId || !pageId) return;
        const hintTimeout = 2 * 60 * 1000; // 30 minutes in millseconds
        let startTime = (new Date(timeStarted)).getTime();
        let currentTime = Date.now();
        if (currentTime >= (startTime + hintTimeout) && (!hint || hint === '')) {
            // fetch hint from server
            console.log("fetching hint");
            getHint(questId, pageId);
        } else {
            setTimeout(() => getHint(questId, pageId), startTime + hintTimeout - currentTime);
        }
    }, [timeStarted, questId, pageId, getHint, hint]);


    useEffect(() => {
        //console.log("here are the elements", elements);
       if (!elements || elements.length === 0) return;
        let inputHash = elements.reduce((inputMap, element) => {
            if (element.validation) {
                return {
                    ...inputMap,
                    [element.id]: element.validation,
                }
            } else {
                return inputMap;
            }
        }, {});
        console.log("hash", inputHash);
        setInputs({
            loading: false,
            values: inputHash
        })

    }, [elements]);



   const hintReveal = 
   <div className='page-element hint-container'>
        <span className='hint'>{hint}</span> :
        <span className='reveal'>Reveal Hint</span>
   </div>


    if (loading || inputs.loading) {
        return <Loading />
    } else {
        return  <div className='quest-page'>
            {
                elements.filter(element => element.shown)
                        .map(element => {
                            if (element.validation) {
                                return <PageElement key={element.id} 
                                    element={element}
                                    validation={inputs.values[element.id]}
                                    onChange={onChange(element.id)} onComplete={() => onComplete(element.id)} />
                            } else {
                                return <PageElement key={element.id} element={element} 
                                            onComplete={() => onComplete(element.id)} />
                            }

                        })          
            }
            {
                hint && hint !== "" && hintReveal
            }
            {
                elements.every(element => element.completed) &&
                backToMap
            }
            </div>
    }
}

QuestPage.propTypes = {
    page: PropTypes.object.isRequired,
    loadQuestPage: PropTypes.func.isRequired,
    completeElement: PropTypes.func.isRequired,
    validateElement: PropTypes.func.isRequired,
    getHint: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    page: state.questPage
})

export default connect(mapStateToProps, { loadQuestPage, completeElement, validateElement, getHint })(QuestPage)