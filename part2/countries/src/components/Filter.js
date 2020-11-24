import React from "react";

export default function Filter(props) {
    return (
        <div>
            find countries <input value={ props.nameFilter }
            onChange={ props.handleChangeFilter } />
        </div>
    );
}