import React from "react";

export default function Filter(props) {
    return (
        <div>
            filter shown with <input value={ props.value }
            onChange={ props.handleChange } />
        </div>
    );
};