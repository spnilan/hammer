import React, { useEffect } from 'react'

const Text = ({content, completed, onComplete}) => {


    useEffect(() => {
        if (!completed) {
            setTimeout(() => onComplete(), 2000);
        }
    }, [completed, onComplete]);

    return (
        <div>
            {content}
        </div>
    )
}



export default Text
