import React from 'react';
import { filterContent } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = (props) => {

    const handleChange = event => {
        const content = event.target.value;
        props.filterContent(content);
    };

    const style = {
        marginBottom: 10,
        marginTop: 10
    };

    return (
        <div style={style}>
            filter <input onChange={ handleChange } />
        </div>
    );
};

const mapDispatchToProps = {
    filterContent
};

const connectedFilter = connect(
    null,
    mapDispatchToProps
)(Filter);

export default connectedFilter;