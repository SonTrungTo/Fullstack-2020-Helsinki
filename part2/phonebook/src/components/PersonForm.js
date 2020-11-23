import React from "react";

export default function PersonForm(props) {
      return (
        <form onSubmit={ props.handleSubmit }>
            <div>
                name: <input value={ props.valueNewName }
                onChange={ props.handleChangeName } />
            </div>
            <div>
                number: <input value={ props.valueNewNumber }
                onChange={ props.handleChangeNumber } />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
      );
};