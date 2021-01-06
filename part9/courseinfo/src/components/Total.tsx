import React from 'react';
import { courseParts } from '../types';

const Total: React.FC<{ total: courseParts[] }> = (props) => {
    return (
        <p>
            Number of exercises{" "}
            { props.total.reduce((carry, content) => carry + content.exercisesCount, 0) }
        </p>
    );
};

export default Total;