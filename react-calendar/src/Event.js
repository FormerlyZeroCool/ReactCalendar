import React, { useEffect, useState, useRef } from "react";

/*
interface props {
    description:string
    time:number //ms since 1970
}
*/


export default function Event(props)
{
    
    return (
        <div className="event">
            {props.description}
        </div>
    );
}