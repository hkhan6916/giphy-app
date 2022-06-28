import { useEffect } from 'react';

/**
 * Detects when typing within an input stops for a period of the delay time.
 *
 * @description - This hook listens on value changes and waits for a timeout to fulfill. If the value chanegs before the timeout fulfills, the timeout is reset.
 *
 * @param {void} onTypingEnd - A function which will get called when typing stops.
 * @param {string} value - The value of the Input. This will trigger the timeout as it changes.
 */
const useTypingDebounce = ({ onTypingEnd, value, delay, enabled }) => {
    useEffect(() => {
        if (enabled) {
            const timeout = setTimeout(() => {
                if (onTypingEnd) {
                    onTypingEnd(value);
                }
            }, delay);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [onTypingEnd, value, delay, enabled]);
};

export default useTypingDebounce;
