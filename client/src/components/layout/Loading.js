import React, { useState, useEffect} from 'react'

const Loading = props => {

    // don't display loader until certain time has passed
    const [display, setDisplay] = useState(false);

    const waitTime = props.waitTime || 300;

    useEffect(() => {
        const tid = setTimeout(() => setDisplay(true), waitTime);
        return () => clearTimeout(tid);
    }, []);

    return display && 
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "50px"}}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
        
}

export default Loading
