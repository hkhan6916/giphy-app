import axios from 'axios';
const fetchGifs = async (type, query, offset) => {
    if (!query) {
        // for when the search bar is cleared, we just show trending results
        type = 'trending';
    }

    const { data: gifs } = await axios(
        `https://api.giphy.com/v1/gifs/${type}`,
        {
            // I have exposed the api key in here so this project can quickly be ran
            params: {
                api_key: 'lRViRqPGywjQVtvdxFwev0NqwkiRO7eq', //process.env.REACT_APP_API_KEY,
                q: query,
                offset,
            },
            headers: { 'Content-Type': 'application/json' },
        }
    );

    if (gifs?.data) {
        return gifs.data;
    }
};

export default fetchGifs;
