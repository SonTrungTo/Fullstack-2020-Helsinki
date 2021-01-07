import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../helper';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    const renderContent = (part: CoursePart) => {
        return Object.entries(part).map(element =>
            <div key={ element[0] }>
                { element[0] } { element[1] }
            </div>
        );
    };

    switch (part.name) {
        case 'Fundamentals': 
            return <div style={{margin: 10}}>{renderContent(part)}</div>;

        case 'Using props to pass data':
            return <div style={{margin: 10}}>{renderContent(part)}</div>;

        case 'Deeper type usage':
            return <div style={{margin: 10}}>{renderContent(part)}</div>;
        
        case 'Part 9 of FS2020':
            return <div style={{margin: 10}}>{renderContent(part)}</div>;

        default:
            return assertNever(part);
    }
};

export default Part;