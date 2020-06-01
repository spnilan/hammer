import React, { Fragment, useState, useRef, useEffect } from 'react'
import './clock.css'


const Clock = ({ time, onChange , validated, completed, onComplete }) => {

    let [state, setState] = useState({
        hour: time.hour || 0,
        minute: time.minute || 0,
        mouseDownHour: false,
        mouseDownMinute: false
    })

    //let [time, setTime] = useState();

    let clock = useRef();
    function minuteRotation(minute) {
        return {
            '--rotation': minute * 6
        }
    }

    function hourRotation(hour, minute) {
        return {
            '--rotation': (hour + (minute/60)) * 30
        }
    }

    useEffect(() => {
        if (validated) return;
        //console.log("state", state.hour, state.minute);
        //console.log("time", time.hour, time.minute);
        if (!state.mouseDownHour && !state.mouseDownMinute && (state.minute !== time.minute || state.hour !== time.hour)) {
            onChange({
                hour: state.hour,
                minute: state.minute
            })
        }
    }, [state, time, onChange, validated]);


    useEffect(() => {
        if (validated && !completed) {
            onComplete();
        }
    }, [validated, completed, onComplete]);



    const getAngle = (x, y) => {
        return ((Math.atan2(x, -y) * 180 / Math.PI) + 360) % 360;
    }

    const calculateXPosition = e => {
        return e.pageX - clock.current.offsetLeft - clock.current.offsetWidth / 2;
    }
    const calculateYPosition = e => {
        return e.pageY - clock.current.offsetTop - clock.current.offsetHeight / 2;
    }

    const onMinuteHandMove = e => {
        //console.log("minutemove");
        let currentAngle = getAngle(calculateXPosition(e), calculateYPosition(e));
        let prevMinute = state.minute;
        let newMinute = Math.floor((currentAngle / 360) * 60);
        let newHour = state.hour;    
        if (prevMinute > 55 && newMinute < 5) {
            newHour = (state.hour + 1) % 12;
        } else if (prevMinute < 5 && newMinute > 55) {
            newHour = ((state.hour - 1) + 12) % 12; 
        }
        setState(state => ({
            ...state,
            minute: newMinute,
            hour: newHour
        }));
    }

    const onHourHandMove = (e) => {
        let currentAngle = getAngle(calculateXPosition(e), calculateYPosition(e));

        let newHour = Math.floor((currentAngle / 360) * 12);
        let minuteRatio = 12 * (currentAngle / 360) - newHour;
        let newMinute = Math.floor(minuteRatio * 60);

        setState(state => ({
            ...state,
            hour: newHour,
            minute: newMinute
        }))
        
    }

    const onMouseMove = (e) => {
        if (state.mouseDownMinute) onMinuteHandMove(e);
        else if (state.mouseDownHour) onHourHandMove(e);
        else return;
    }


    const onMouseUp = (e) => {
        if (validated) return;
        setState(state => ({
            ...state,
            mouseDownHour: false,
            mouseDownMinute: false
        }));

    }

    const onMouseDownHour = () => {
        if (validated) return;
        setState(state => ({
            ...state,
            mouseDownHour: true
        }))
    }
    const onMouseDownMinute = () => {
        if (validated) return;
        setState(state => ({
            ...state,
            mouseDownMinute: true
        }))
    }

    const getTime = function(hour, minute) {
        let minuteStr = minute < 10 ? `0${minute}` : minute.toString();
        if (hour === 0) {
             return `12:${minuteStr}`;
            } else {
                return `${hour}:${minuteStr}`;
         }
    }

    const onTouchMove = (e) => {
        e.preventDefault();
        onMouseMove(e.touches[0]);
    }

    let hourHandClass = "hand hour-hand" + (state.mouseDownHour ? " selected" : "");
    let minuteHandClass = "hand minute-hand" + (state.mouseDownMinute ? " selected" : "");


    return (
        <Fragment>
            <div className='clock-info'>
                Time: {getTime(state.hour, state.minute)}
            </div>

            <div className='clock' ref={clock}
                //onClick={onClick}
                onMouseMove={onMouseMove}
                onTouchMove={onTouchMove}
                onMouseUp={onMouseUp}
                onTouchEnd={onMouseUp} >
                <div className={hourHandClass}
                    onTouchStart={onMouseDownHour}
                    onMouseDown={onMouseDownHour} 
                    style={hourRotation(state.hour, state.minute)}
                    data-hour-hand>
                </div>
                <div className={minuteHandClass}
                    onTouchStart={onMouseDownMinute}
                    onMouseDown={onMouseDownMinute}
                    style={minuteRotation(state.minute)}
                    data-minute-hand>
                </div>
                <div className='number number1'>I</div>
                <div className='number number2'>II</div>
                <div className='number number3'>III</div>
                <div className='number number4'>IV</div>
                <div className='number number5'>V</div>
                <div className='number number6'>VI</div>
                <div className='number number7'>VII</div>
                <div className='number number8'>VII</div>
                <div className='number number9'>IX</div>
                <div className='number number10'>X</div>
                <div className='number number11'>XI</div>
                <div className='number number12'>XII</div>
            </div>


        </Fragment>
            
    )
}

export default Clock
