import React from 'react';
import { courseParts } from '../types';

const Content: React.FC<{ contents: courseParts[] }> = (props) => {
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