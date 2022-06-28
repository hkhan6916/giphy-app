import axios from 'axios';
const fetchGifs = async (type = 'trending', searchQuery, offset) => {
    const { data: gifs } = await axios(
        // I have exposed the api key and url in here so this project can quickly be ran
        `https://api.giphy.com/v1/gifs/${searchQuery ? type : 'trending'}`,
        {
            params: {
                api_key: 'lRViRqPGywjQVtvdxFwev0NqwkiRO7eq', //process.env.REACT_APP_API_KEY,
                q: searchQuery,
                offset,
                limit: 20,
            },
        }
    );

    if (gifs?.data) {
        return gifs.data;
    }
};

export default fetchGifs;
