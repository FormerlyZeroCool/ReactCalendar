import React, { useState } from "react";
import './App.css';
import {days_in_month, between_time, now, day_of_week_lookup, month_lookup, get_first_of_month_time, get_first_of_week_time, events} from './utils.js';
import Day from './Day.js'
import GridRow from "./GridRow";
import Header from "./Header";
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
    //define descriptor constants
    ViewType.month = 0;
    ViewType.week = 1;
    ViewType.day = 2;

    //generic constants
    ViewType.max_days_in_week = 6;

    //finish member variables with default values
    this.state = ViewType.day;

  } 
  set_render_type(viewTypeDescriptor, date, render_weekend = this.render_weekend)
  {
    this.state = viewTypeDescriptor;
    this.render_weekend = render_weekend;
    const first_of_week = get_first_of_week_time(get_first_of_month_time(date));
    switch(viewTypeDescriptor)
    {
      
      case(ViewType.month):
      const days = days_in_month(date.getFullYear(), date.getMonth()) + (ViewType.max_days_in_week - first_of_week.getDay());
      if(this.render_weekend)
      {
        this.per_row_days = 7;
        this.total_days = days;
      }
      else
      {
        this.per_row_days = 5;
        this.total_days = days - 6;
      }
      break;
      case(ViewType.week):
      if(this.render_weekend)
      {
        this.per_row_days = 7;
        this.total_days = 7;
      }
      else
      {
        this.per_row_days = 5;
        this.total_days = 5;
      }
      break;
      default:
      case(ViewType.day):
        this.per_row_days = 1;
        this.total_days = 1;
      break;
    }
    return this.clone();
  }
  clone()
  {
    const clone = new ViewType(this.total_days, this.per_row_days, this.render_weekend);
    clone.state = this.state;
    return clone;
  }
};
let grid_row_id = 0;
let day_id = 0;
function App() {
  const [viewType, setViewType] = useState(new ViewType(1, 1, false));
  const [date, setDate] = useState(now());
  const first_of_month = get_first_of_month_time(date);
  const first_of_week = get_first_of_week_time(date);
  const first_of_first_week = get_first_of_week_time(first_of_month);
  //const days = new Array(viewType.total_days).fill(0, 0, viewType.total_days).map((val, i) => i + week * 7);
  const days_container = [];
  let event_index = 0;
  const current_render_day = new Date(viewType.total_days > now().getDate() ? first_of_first_week : viewType.total_days > 1 ? first_of_week : date);
  
  for(let row = 0; row < viewType.total_days / viewType.per_row_days; row++)
  {
    let days_in_row = [];
    for(let i = 0; i < viewType.per_row_days && row * viewType.per_row_days + i < viewType.total_days; i++)
    {
      //to map events to days like merging two sorted arrays in merge sort
      //as a result events must be sorted in ascending order relative to the time they take place
      current_render_day.setHours(0, 0, 0, 0);
      const start_day = current_render_day;
      const end_day = new Date(current_render_day);
      end_day.setDate(end_day.getDate() + 1);//make end date start of next day
      const current_day_events = [];
      //merge events with days
      while(events.length > event_index && events[event_index].time < end_day.getTime())
      {
        if(between_time(new Date(events[event_index].time), start_day, end_day))
          current_day_events.push(events[event_index]);

        event_index++;
      }
      //finished mapping creating day
      days_in_row.push(<Day key={day_id++} large_day={viewType.total_days === 1} gray_out={current_render_day.getMonth() !== date.getMonth()} events={current_day_events} day_of_month={current_render_day.getDate()}/>);
      current_render_day.setDate(current_render_day.getDate() + 1);
      while(!viewType.render_weekend && (current_render_day.getDay() === 6 || current_render_day.getDay() === 0))
      {
        current_render_day.setDate(current_render_day.getDate() + 1);
      }
    }
    days_container.push(<GridRow objects={days_in_row} key={grid_row_id++}/>);
  }
  const week_header = [];

  for(let i = 0; i < day_of_week_lookup.length; i++)
  {
    week_header.push(<Header description={day_of_week_lookup[i].substring(0, 3)} key={"a1127d" + grid_row_id++}/>);
  }
  if(!viewType.render_weekend)//remove sat, and sun header
  {
    week_header.pop();
    week_header.pop();
  }
  const to_mon_start = (i) => i === 0 ? 6 : i - 1;
  const week_header_formatted = <GridRow objects={viewType.state !== ViewType.day ? week_header : <Header description={day_of_week_lookup[to_mon_start(date.getDay())]} key={"a1127d" + grid_row_id++}/>} key={"a11z"+grid_row_id++}/>;
  console.log(week_header_formatted)
  return (
    <div className="App">
      <header className="App-header">
        <ul>
            <div className="calendar-header">
              <button className="arrow left" onClick={() => {
                  if(viewType.total_days > 7)
                    date.setMonth(date.getMonth() - 1);
                  else if(viewType.total_days > 1)
                    date.setDate(date.getDate() - 7);
                  else
                    date.setDate(date.getDate() - 1);
                  
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
                  if(viewType.total_days > 7)
                    date.setMonth(date.getMonth() + 1);
                  else if(viewType.total_days > 1)
                    date.setDate(date.getDate() + 7);
                  else
                    date.setDate(date.getDate() + 1);

                  setDate(new Date(date));
                }}></button>
            </div>
            <span className="small-spacer"></span>
            <div
                role="list"
                className="list"
                aria-labelledby="list-heading"
                >
                <li>
                  <button className={viewType.state === ViewType.month ?"selected-main-button":"main-button"}
                    onClick={() => setViewType(viewType.set_render_type(ViewType.month, date))}>
                    Month</button>
                  <div className="small-spacer"></div>
                  <button className={viewType.state === ViewType.week ?"selected-main-button":"main-button"}
                    onClick={() => setViewType(viewType.set_render_type(ViewType.week, date))}>
                    Week</button>
                  <div className="small-spacer"></div>
                  <button className={viewType.state === ViewType.day ?"selected-main-button":"main-button"}
                    onClick={() => setViewType(viewType.set_render_type(ViewType.day, date))}
                    >Day</button>
                </li>
                <li>

                <button className={viewType.render_weekend ? "selected-main-button":"main-button"}
                    style={{display: viewType.state === ViewType.day ? "none":"inline"}}
                    onClick={() => setViewType(viewType.set_render_type(viewType.state, date, !viewType.render_weekend))}>
                    Weekends</button>
              </li>
            </div>
        </ul>
                <div className="grid-container">
                  {week_header_formatted}
                </div>
                <div className="grid-container">
                  {days_container}
                </div>
      </header>
    </div>
  );
}

export default App;
