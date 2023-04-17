import React, { useState } from "react";
import SubEvent from "./SubEvent";

/*
interface props {
    description:string
    sub_events:string[]
    show_sub_events:boolean
    time:number //ms since 1970
}
*/

let sub_event_id = 0;
export default function Event(props)
{
    const [showing, setShowing] = useState(props.show_sub_events);
    const sub_events = props.sub_events.map(se => {
        return <SubEvent description={se} visible={showing} key={sub_event_id++} />
    });
    let collapse_arrow = <div className="small-grayed-arrow right" ></div>;
    if(sub_events.length > 0)
    {
        if(showing)
            collapse_arrow = <div className="small-arrow down" onClick={() => setShowing(!showing)}></div>;
        else 
            collapse_arrow = <div className="small-arrow right" onClick={() => setShowing(!showing)}></div>;
    }
    return (
        <div className="event" >
            {collapse_arrow}
            <span className="small-spacer"></span>
            {props.description}
            <div className="sub-event-container">{sub_events}</div>
        </div>
    );
}