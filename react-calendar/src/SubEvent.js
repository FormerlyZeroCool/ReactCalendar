import React, { useEffect, useState, useRef } from "react";

/*
interface props {
    description:string
}
*/


export default function SubEvent(props)
{
    return (
        <div className={props.visible ? "sub-event" : "hidden"}>
            {props.description}
        </div>
    );
}