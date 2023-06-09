import React, { useEffect, useState, useRef } from "react";
import Event from './Event.js'
/*
interface Event {
    description:string;
    sub_events:string[]
    show_sub_events:boolean
    time:number; //ms since 1970

}
interface props {
    date:Date;
    events:Event[];
    gray_out:boolean;
    large_day:boolean;
}
*/
let event_guid = 0;
export default function Day(props)
{
    const events = props.events.map(event => {
        return <Event show_sub_events={false} description={event.description} sub_events={event.sub_events} key={event_guid++}/>
    });
    return (
        <div className={props.large_day ? "large-day" : "day"}>
        <h3 style={props.gray_out ? {color:"gray"}:{}}>{props.day_of_month}</h3> 
        <div className="event-list">
            {events}
        </div>
        </div>
    );
}