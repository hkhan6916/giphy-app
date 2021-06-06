module.exports = {
    root: true,
    env: {
        browser: true,
        node: false,
    },
    parser: 'babel-eslint',
    extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
    plugins: [],
    rules: {
        'react/prop-types': 0,
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
};
