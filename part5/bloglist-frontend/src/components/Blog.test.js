import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

describe('<Blog />', () => {
    let component;
    const blog = {
        title: 'test blog',
        author: 'Son To',
        url: 'random url'
    };

    beforeEach(() => {
        component = render( <Blog blog={blog} />);
    });

    test('render its component', () => {
        const div = component.container.querySelector('#blogContent');
        expect(div).toBeDefined();
        console.log(prettyDOM(div));
    });

    test('show title and author', () => {
        const div = component.container.querySelector('#blogContent');
        expect(div).not.toHaveStyle('display: none');
    });

    test('does not show likes and url', () => {
        const div = component.container.querySelector('.hiddenInfo');
        expect(div).toHaveStyle('display: none');
    });

    test('show likes and url when button is clicked', () => {
        const button = component.getByText('show');
        fireEvent.click(button);

        const div = component.container.querySelector('.hiddenInfo');
        expect(div).not.toHaveStyle('display: none');
    });
});