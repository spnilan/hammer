import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadQuest } from '../../actions/quest';
import { scroller, Element, animateScroll as scroll } from 'react-scroll'
import Loading from '../layout/Loading'

/*
const scrollToRef = (ref, block) => {
    if (ref.current) {
        ref.current.scrollIntoView({
            behavior: "smooth",
            block: block
        });
    }
}
*/

function vh(v) {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (v * h) / 100;
}

const QuestMap = ({ quest, match, loadQuest }) => {
    const { loading, id, pages, currentPage, timeStarted, timeEnded, timeLiminitMinutes, completed, hasSeenNewestPage } = quest;
    
    let questId = match.params.questId;
    let avatar = "/images/abbi.png";

    useEffect(() => {
        loadQuest(questId);
    }, [questId, loadQuest]);


    useEffect(() => {
        scroller.scrollTo('user-image-container', {
            duration: 1200,
            delay: 200,
            offset: -vh(8),
            smooth: 'easeIn'
          })
        //setTimeout(() => scrollToRef(userRef, "center"), 100);
    }, [currentPage]);


    const userImage = <img className='map-user' src={avatar} alt="user" />
    
    //const colors = ["#ff2400", "#e8b71d", "#e3e81d", "#1de840", "#1ddde8", "#2b1de8", "#dd00f3"];
    const rainbow =["#E6471F", "#F48C26", "#FFEE32", "#408222", "#2164FB", "#793D88"]
    const colors = ["#39393cfa"].concat(rainbow);
    const makePath = (page, index, displayedOnMap) => {

        let {_id, mapIcon } = page;
        let animationDelay = 1500;
        let animationDuration = 1200;

        let pathAnimation = {
            //background: `linear-gradient(${colors[index % colors.length]},  ${colors[(index + 1) % colors.length]})`
           background: `${colors[index % colors.length]}`
        };
        let imageAnimation = {};
        if (!displayedOnMap) {
            let delay = animationDelay + animationDuration + 200;
            pathAnimation = {
                ...pathAnimation,
                height: 0,
                animation: `grow-path ${animationDuration}ms ease-in-out ${animationDelay}ms forwards`
            }
            imageAnimation = {
                opacity: 0,
                animation: `image-fade-in 300ms ease-in-out ${delay}ms forwards`
            }
            //setTimeout(() => scrollToRef(userRef, "start"), delay);
            /*scroller.scrollTo('user-image-container', {
                duration: 1200,
                delay: delay + 100,
                offset: -vh(8),
                smooth: 'easeIn'
              })
            
           scroll.scrollToBottom({
               duration: 1200 + 300,
               delay: animationDelay + 100,
               smooth: 'easeInOut'
           })
           */
           
        }

        
        return <div key={_id}>
                <div className='path' style={pathAnimation}>
                </div>
                {currentPage === _id ?
                    <Element name='user-image-container'>
                        <Link to={`/quest/${questId}/${_id}`}>
                            <div className='map-icon-container' style={imageAnimation}>
                                <img className='map-icon' src={mapIcon} alt="page" />
                                {userImage}
                            </div>
                         </Link>
                    </Element> :
                    <Link to={`/quest/${questId}/${_id}`}>
                        <div className='map-icon-container' style={imageAnimation}>
                            <img className='map-icon' src={mapIcon} alt="page" />
                        </div>
                    </Link>
                }
                </div>
    }

    

    if (!loading && !id) {
        return <Redirect to='/dashboard' />
    }

    return loading ? <Loading /> :
        <div className='quest-map'>
            {!currentPage && 
                <div className='map-user-container'>
                    {userImage}
                </div> 
            }
            { pages.map((page, index) => makePath(page, index, hasSeenNewestPage ? true : index !== pages.length - 1 ))}
        </div>
}

QuestMap.propTypes = {
    loadQuest: PropTypes.func.isRequired,
    quest: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    quest: state.quest
})

export default connect(mapStateToProps, { loadQuest })(QuestMap)
