import React, { useEffect, useState, useRef } from "react";

/*
interface props {
    description:string
    checked:boolean
}
*/


export default function SubEvent(props)
{
    const [checked, setChecked] = useState()
    return (
        <div className={props.visible ? "sub-event" : "hidden"}>
            {props.description}
        </div>
    );
}