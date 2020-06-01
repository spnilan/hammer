import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createNewQuest } from '../../actions/create'

function CreateQuest({ created }) {


    // we have a list of quests that the user has created

    return created.length === 0 ?
        <div>
            You've got no quests made yet! Let's start one.
        </div>
        :
        <div>
            <ul>
                {
                    created.map((quest => (
                        <Link to={`/create/${quest.id}`}>
                            {quest.title}
                        </Link>
                    )}
            </ul>
        </div>
}

CreateQuest.PropTypes = {
    createNewQuest: PropTypes.func.isRequired,
    created: PropTypes.array.isRequired
}



const mapStateToProps = state => ({
    created: user.created
})

export default connect(mapStateToProps, { createNewQuest })(CreateQuest)

