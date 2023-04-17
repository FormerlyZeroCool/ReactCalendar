import React, { useEffect, useState, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import {now, month_lookup, get_first_of_month_time, events} from './utils.js';
import Day from './Day.js'
/*
interface props {
    description:string
    time:number //ms since 1970
}
*/
class ViewType {
  constructor(total_days, per_row_days = 5)
  {
    this.total_days = total_days;
    this.per_row_days = per_row_days;
  } 
};
function App() {
  const first_of_month = get_first_of_month_time();
  const [week, setWeek] = useState(first_of_month + Math.floor(now().getDate() / 7))
  const [month, setMonth] = useState(now().getMonth());
  const [year, setYear] = useState(now().getFullYear());
  const [viewType, setViewType] = useState(new ViewType(5, 5));
  const days = new Array(viewType.total_days).fill(0, 0, viewType.total_days).map((val, i) => i + week * 7);
  console.log(days)
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
