import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<{ contents: CoursePart[] }> = (props) => {
    return (
        <>
            { props.contents.map(content =>
                <Part key={content.name} part={ content } />
                )
            }
        </>
    );
};

export default Content;