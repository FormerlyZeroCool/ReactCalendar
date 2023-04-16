import React, { useEffect, useState, useRef } from "react";
import Event from './Event.js'
/*
interface Event {
    description:string;
    time:number; //ms since 1970

}
interface props {
    date:Date;
    events:string[];
}
*/
let event_guid = 0;
export default function Day(props)
{
    const events = props.events.map(event => {
        return <Event description={event.description} key={event_guid++}/>
    });
    return (
        <div className="day">
        <h3>{props.day_of_month}</h3> 
        <div className="event-list">
            {events}
        </div>
        </div>
    );
}