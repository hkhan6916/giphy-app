import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import SearchBar from '../index';
import '@testing-library/jest-dom';

expect.extend(toHaveNoViolations);
const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);

describe('SearchBar', () => {
    test('should render correctly', async () => {
        render(
            <SearchBar
                name='testSearchBar'
                placeholder='test search placeholder'
            />
        );

        const renderedSearchBar = screen.getByPlaceholderText(
            'test search placeholder'
        );
        expect(renderedSearchBar).toMatchSnapshot();
    });
    test('should render error correctly', async () => {
        const { getByText } = render(
            <div>
                <SearchBar
                    name='errorSearch'
                    placeholder='test search placeholder'
                    data-testid='searchTest'
                    error='some error'
                />
                <button type='submit' data-testid='submitButton'>
                    Submit
                </button>
            </div>
        );

        const renderedError = getByText('some error');

        expect(renderedError).toHaveTextContent('some error');
    });
    test('should not have any programatically detectable a11y issues', async () => {
        const { getByTestId } = render(
            <SearchBar
                name='testSearchBar'
                placeholder='test search placeholder'
                data-testid='searchTest'
            />
        );

        expect(await axe(getByTestId('searchTest'))).toHaveNoViolations();
    });
});
