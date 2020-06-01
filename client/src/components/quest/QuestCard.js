import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DateTime, Duration } from 'luxon';
/* ICONS
Completed checkmark
Delete 
Warning sign if it's expired
*/


const useTimer = ({ expirationTime }) => {

  const currentTime = DateTime.local();
  const initialTimeRemaining = currentTime > expirationTime ? 0 :
                              Math.floor(
                                expirationTime.diff(currentTime, 'seconds').as('seconds')); 
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);
  const [expired, setExpired] = useState(currentTime > expirationTime);

  useEffect(() => {
    const intervalId = setInterval(() => setTimeRemaining(t => t - 1), 1000);
    if (timeRemaining === 0) {
        clearInterval(intervalId);
        setExpired(true);
    }
    return () => clearInterval(intervalId);
  }, []);

  return { expired, timeRemaining };
}


const QuestInfo = ({ expirationTime, location, stepsCompleted }) => {
  const { expired, timeRemaining } = useTimer({expirationTime});
  // duration.shiftTo('hours', 'minutes', 'seconds');
  const  dateFormat = Duration.fromObject({ seconds: timeRemaining }).toFormat("hh:mm:ss");


  return        <ul className="list-group list-group-flush">
    
                      <li className="list-group-item">
                        <span className='card-list-key'>Time remaining: </span>
                        {dateFormat}
                      </li>
                      <li className="list-group-item">
                        <span className='card-list-key'>Current step: </span>
                        {stepsCompleted}
                      </li>
                      <li className="list-group-item">
                        {location}
                      </li>
                  </ul>

}



const QuestCard = ({ quest }) => {

  let {_id, title, timeStarted, pages } = quest;

  const location = <p><i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Portland, ME</p>;


  let questInfo;

  if (!timeStarted) {
    questInfo = <ul className="list-group list-group-flush">
      <li className="list-group-item">
      <Link to={`/quest/${_id}`}>
        <button className='btn btn-lg btn-primary'>
          Start the quest!
        </button>
      </Link>
      </li>
      <li className="list-group-item">
        {location}
      </li>
    </ul>
  } else {
    const expirationTime = DateTime.fromISO(timeStarted).plus({ hours: 4})
    questInfo = <QuestInfo expirationTime={expirationTime} 
                           location={location} stepsCompleted={pages.length} />
  }
    

  return (<Link to={`/quest/${_id}`}>
            <div className="card">  
              <img className="card-img-top" src="/images/icons/college.jpg" alt={title} />
              <div className="card-body">
                <h5 className="card-title">
                  {title}
                </h5>
                <p className="card-text">
                  You made it through college in 4 years.
                  Now try 4 hours.
                </p>
              </div>
              {questInfo}
            </div>
          </Link>
          
         );

};


export default QuestCard;
