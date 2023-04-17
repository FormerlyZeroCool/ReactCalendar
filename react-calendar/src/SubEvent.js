import React from "react";

/*
interface props {
    description:string
    checked:boolean
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