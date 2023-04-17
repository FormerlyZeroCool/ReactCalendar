import React, { useEffect, useState, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import {between_time, now, month_lookup, get_first_of_month_time, get_first_of_week_time, events} from './utils.js';
import Day from './Day.js'
import GridRow from "./GridRow";
/*
interface props {
    description:string
    time:number //ms since 1970
}
*/
class ViewType {
  constructor(total_days, per_row_days = 5, render_weekend = false)
  {
    this.total_days = total_days;
    this.per_row_days = per_row_days;
    this.render_weekend = render_weekend;
  } 
};
let grid_row_id = 0;
let day_id = 0;
function App() {
  const [viewType, setViewType] = useState(new ViewType(26, 7, false));
  const [date, setDate] = useState(now());
  const first_of_month = get_first_of_month_time(date);
  const first_of_week = get_first_of_week_time(date);
  //const days = new Array(viewType.total_days).fill(0, 0, viewType.total_days).map((val, i) => i + week * 7);
  const days_container = [];
  let event_index = 0;
  let weekends_offset = 0;
  const current_render_day = new Date(viewType.total_days > now().getDate() ? first_of_month : viewType.total_days > 1 ? first_of_week : now());
  for(let row = 0; row < viewType.total_days / viewType.per_row_days; row++)
  {
    let days_in_row = [];
    for(let i = 0; i < viewType.per_row_days && row * viewType.per_row_days + i < viewType.total_days; i++)
    {
      //to map events to days like merging two sorted arrays in merge sort
      current_render_day.setHours(0, 0, 0, 0);
      const start_day = current_render_day;
      const end_day = new Date(current_render_day);
      end_day.setHours(23, 59, 59);
      const current_day_events = [];
      //merge events with days
      while(events.length > event_index && between_time(new Date(events[event_index].time), start_day, end_day))
      {
        current_day_events.push(events[event_index++]);
      }
      //finished mapping creating day
      days_in_row.push(<Day key={day_id++} events={current_day_events} day_of_month={current_render_day.getDate()}/>);
      current_render_day.setDate(current_render_day.getDate() + 1);
      while(!viewType.render_weekend && (current_render_day.getDay() === 6 || current_render_day.getDay() === 0))
      {
        current_render_day.setDate(current_render_day.getDate() + 1);
      }
    }
    days_container.push(<GridRow days={days_in_row} key={grid_row_id++}/>);
  }

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
                  {days_container}
                </div>
      </header>
    </div>
  );
}

export default App;
