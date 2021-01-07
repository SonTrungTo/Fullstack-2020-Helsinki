import React from 'react';
import { CoursePartBase } from '../types';

const Content: React.FC<{ contents: CoursePartBase[] }> = (props) => {
    return (
        <>
            { props.contents.map(content =>
                <p key={ content.name }>
                    { content.name } { content.exercisesCount }
                </p>
                )
            }
        </>
    );
};

export default Content;