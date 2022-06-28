import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import useTypingDebounce from '../../hooks/useTypingDebounce';

import './styles.scss';

/**
 * SearchBar
 *
 * Renders a custom Search input container for a search bar with custom styles
 *
 * @param {() => void} [onCancel] - The function to call when the close button is clicked
 * @param {() => void} [onTypingEnd] - The function to call when typing stops
 * @param {number} [debounceDelay] - The period of time to wait before calling the onTypingEnd function
 * @param {Ref} [innerRef] - The ref to forward
 */
const SearchBar = ({
    debounceDelay,
    onTypingEnd = () => null,
    name,
    onCancel,
    children,
    className,
    innerRef,
    error,
    style,
    'data-testId': dataTestId,
    ...restOfProps
}) => {
    const [value, setValue] = useState('');
    const [enableDebounce, setEnableDebounce] = useState(false);

    useTypingDebounce({
        onTypingEnd: onTypingEnd,
        value,
        delay: debounceDelay || 100,
        enabled: enableDebounce,
    });

    const handleChange = (value) => {
        // This condition makes sure useTypingDebounce does not run when the component first renders
        if (!enableDebounce && value) setEnableDebounce(true);
        setValue(value);
    };

    const handleCancel = () => {
        // We reset the field and also call the onCancel which could be used for something like clearing the search results externally
        setValue('');
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div className='search-bar' style={style}>
            <div
                className='input-container'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '0 0 2px 0',
                }}>
                <input
                    className='input'
                    alt='Input Box'
                    type='search'
                    name={name}
                    ref={innerRef}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    {...restOfProps}
                />
                {children}
                {!!value && (
                    <button
                        aria-label='Cancel Button'
                        type='button'
                        className='close-button'
                        onClick={() => handleCancel()}>
                        <AiOutlineCloseCircle
                            title='Close Icon'
                            className='close-icon'
                        />
                    </button>
                )}
            </div>
            {error && (
                <small data-testid='search-error' className='search-error'>
                    {error}
                </small>
            )}
        </div>
    );
};

export default SearchBar;
