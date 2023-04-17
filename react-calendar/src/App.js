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
  const [date, setDate] = useState(now());
  const [viewType, setViewType] = useState(new ViewType(5, 5));
  //const days = new Array(viewType.total_days).fill(0, 0, viewType.total_days).map((val, i) => i + week * 7);
  console.log("hi")
  return (
    <div className="App">
      <header className="App-header">
        <ul>
            <div className="calendar-header">
              <button className="arrow left" onClick={() => {
                  date.setMonth(date.getMonth() - 1);
                  setDate(new Date(date));
                }}></button>
              <div
                role="list"
                className="list"
                aria-labelledby="list-heading"
                >
                <li>{date.getFullYear()}</li>
                <li>{month_lookup[date.getMonth()]}</li>
              </div>
              <button className="arrow right" onClick={() => {
                  date.setMonth(date.getMonth() + 1);
                  setDate(new Date(date));
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
