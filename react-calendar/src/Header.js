import React from "react";

/*
interface props {
    description:string
}
*/


export default function Header(props)
{
    //console.log(props.description)
    return (
        <h4 className="day">
            {props.description}
        </h4>
    );
}