import React from 'react'
import PropTypes from 'prop-types'

const Image = ({source, options}) => {
    return (
        <div>
            <img src={source}></img>
        </div>
    )
}

Image.propTypes = {
    source: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
}

export default Image
