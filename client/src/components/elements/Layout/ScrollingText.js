import React, { useState, useEffect } from 'react'


const ScrollingText = ({ file, completed, onComplete }) => {

    const [shownLines, setShownLines] = useState([]);
    const [timeoutIds, setTimeoutIds] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const { lines, src } = file;

    function cancelTimeouts() {
        let tids = [...timeoutIds];
        setTimeoutIds([]);
        tids.forEach(id => clearTimeout(id));
    }

    function showSnapshot(time) {
        setShownLines(
            lines.filter(line => line.startTime <= time)
            .map(line => ({
                text: line.text,
                highlight: line.endTime > time
            })));
    }

    useEffect(() => {

        if (completed || startTime === null) { return; }
        let shown = lines.filter(line => line.startTime <= startTime);
        let tids = [];
        
        function addAndHighlight(line) {
            let tid = setTimeout(() => {
                setShownLines(shown => [...shown, 
                                        {text: line.text, highlight: true}])
            }, line.startTime - startTime);
            tids.push(tid);
        }

        function unHighlight(line) {
            let tid = setTimeout(() => {
                setShownLines(shown => [...shown.slice(0, -1), 
                                        {text: line.text, highlight: false}])
            }, line.endTime - startTime);
            tids.push(tid);
        }

        
        if (shown.length > 0 && shown[shown.length - 1].endTime > startTime) {
            unHighlight(shown[shown.length - 1]);
        }

        let unshown = lines.filter(line => line.startTime > startTime);
        unshown.forEach(line => {
            addAndHighlight(line);
            unHighlight(line);       
        });
        setTimeoutIds(timeoutIds => [...timeoutIds, ...tids])
        setShownLines(shown.map(line => ({text: line.text, highlight: (startTime < line.endTime)})));
        return () => {
            [...tids].forEach(id => clearTimeout(id));
        };
    }, [lines, startTime, completed]);


    console.log("scrolling text has rendered", completed);

    const audioSrc = "/uploads/3a70bd7d-71ff-46ab-b897-dc82a47d322d.mp3"

    const staticText = () => 
    (<ul className='scrollingText'>
        {lines.map((line, index) => (
            <li key={index} >
                {line.text}
            </li>))}
    </ul>);

   if (completed) {
    return staticText()
   } else {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            justifyContent: 'center',
            alignItems: 'center'

        }}>
            <ul className='scrollingText'>
                {shownLines.map((line, index) => (
                    <li key={index} className={line.highlight ? 'highlight' : ''}>
                        {line.text}
                    </li>
                ))} 
            </ul>
            <audio  controls
                    onPlay={e => setStartTime(e.target.currentTime * 1000)}
                    onPause={cancelTimeouts}
                    onEnded={onComplete}
                    onSeeked={e => showSnapshot(e.target.currentTime * 1000)} >
                <source src={audioSrc} type="audio/mp3"></source>
                <p>Audio doesn't seem to be working sorry</p>
            </audio>
        </div>)

   }

    



}


export default ScrollingText
