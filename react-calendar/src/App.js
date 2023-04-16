import React, { useEffect, useState, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import {now, month_lookup, events} from './utils.js';
import Day from './Day.js'
/*
interface props {
    description:string
    time:number //ms since 1970
}
*/

function App() {
  const [month, setMonth] = useState(now().getMonth());
  const [year, setYear] = useState(now().getFullYear());
  return (
    <div className="App">
      <header className="App-header">
        <ul>
            <div className="calendar-header">
              <button className="arrow left" onClick={() => {
                const reset_month = month - 1 < 0;
                  if(reset_month)
                    setYear(year - 1);
                  setMonth(reset_month ? month_lookup.length - 1 : month - 1);
                }}></button>
              <div
                role="list"
                className="list"
                aria-labelledby="list-heading"
                >
                <li>{year}</li>
                <li>{month_lookup[month]}</li>
              </div>
              <button className="arrow right" onClick={() => {
                  if(month + 1 === month_lookup.length)
                    setYear(year + 1);
                  setMonth((month + 1) % month_lookup.length);
                }}></button>
            </div>
        </ul>
                <div className="grid-container">
                  <Day events={events} day_of_month={15}/>
                </div>
      </header>
    </div>
  );
}

export default App;
