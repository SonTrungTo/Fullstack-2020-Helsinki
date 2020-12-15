import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { prettyDOM } from '@testing-library/dom';
import CreateBlogForm from './CreateBlogForm';

describe('<CreateBlogForm />', () => {
    let component;
    const mockHandler = jest.fn();

    beforeEach(() => {
        component = render(<CreateBlogForm addBlog={mockHandler} />);
    });

    test('component is rendered properly', () => {
        const div = component.container.querySelector('form');
        expect(div).toBeDefined();
        console.log(prettyDOM(div));
    });

    test('addBlog handler should be called and have appropriate argument', () => {
        const form = component.container.querySelector('form');
        const titleInput = component.container.querySelector('#title');
        const authorInput = component.container.querySelector('#author');
        const urlInput = component.container.querySelector('#url');

        fireEvent.change(titleInput, {
            target: { value: 'test some text' }
        });
        fireEvent.change(authorInput, {
            target: { value: 'sonto' }
        });
        fireEvent.change(urlInput, {
            target: { value: 'some url' }
        });
        fireEvent.submit(form);

        expect(mockHandler.mock.calls).toHaveLength(1);
        expect(mockHandler.mock.calls[0][0].title).toBe('test some text');
        expect(mockHandler.mock.calls[0][0].author).toBe('sonto');
        expect(mockHandler.mock.calls[0][0].url).toBe('some url');
    });
});