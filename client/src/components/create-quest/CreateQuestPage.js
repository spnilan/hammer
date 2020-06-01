import React from 'react'
import PropTypes from 'prop-types'

const CreateQuestPage = ({ elements }) => {




    const QuestElementOptions = [
        {
            name: "scrollingTex"
        }
    ]


    return (
        <div>
            
        </div>
    )
}

CreateQuest.PropTypes = {
    createNewQuest: PropTypes.func.isRequired,
    created: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    page: state.user.created
})

export default connect(mapStateToProps, { createNewQuest })(CreateQuest)