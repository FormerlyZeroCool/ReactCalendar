import React from "react";

/*
interface props {
    objects:ReactComponent[]
}
*/


export default function GridRow(props)
{
    return (
        <div className="grid-row">
            {props.objects}
        </div>
    );
}