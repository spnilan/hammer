import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadQuests, deleteUserQuest } from '../../actions/quest';
import QuestCard from './QuestCard'
import Loading from '../layout/Loading'

const Dashboard = ({ quests, loadQuests, deleteUserQuest }) => {

    useEffect(() => {
        loadQuests();
    }, [loadQuests]);

    if (!quests) {
        return <Loading />
    }
    else if (quests.length === 0) {
        return <div style={{ textAlign: "center"}}>
                    <h5>No quests yet</h5>
                </div> 
    }
    else {
        console.log("quests=", quests)
        return <div className='dashboard'>
                {quests.map(quest => 
                    (<QuestCard key={quest._id} quest={quest} 
                            onDelete={() => deleteUserQuest(quest._id)} />))}
                </div>;
                
    }   
    
}

Dashboard.propTypes = {
    loadQuests: PropTypes.func.isRequired,
    deleteUserQuest: PropTypes.func.isRequired,
    quests: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    quests: state.quests
})

export default connect(mapStateToProps, { loadQuests, deleteUserQuest })(Dashboard)