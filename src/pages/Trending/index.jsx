import React, { Component } from 'react';

import fetchGifs from '../../helpers/fetchGifs';
import { Spinner } from '../../components/Spinner';
import './index.scss';

class Trending extends Component {
    state = {
        gifs: [],
        loading: false,
        type: '',
    };

    async componentDidMount() {
        this.setState({ loading: true });
        window.scrollTo(0, 0);
        const gifs = await fetchGifs('trending');
        this.setState({
            gifs,
            loading: false,
            type: 'trending',
        });
    }

    handleSearch = async (e) => {
        e.preventDefault();
        const [input] = e.target.children;
        let userInput = input ? input?.value : e.target.value;

        const gifs = await fetchGifs('search', userInput);
        const type = userInput ? 'search' : 'trending';

        this.setState({
            gifs,
            userSearch: userInput,
            type,
        });
    };

    handleLoadMore = async (e) => {
        let gifs = await fetchGifs(
            this.state.type, // i.e. search
            this.state.userSearch, // i.e. cat or '' if search bar is empty
            this.state.gifs.length + 25
        );
        // I use the offset param in the api to load 25 more gifs
        const newGifArray = [...this.state.gifs, ...gifs];
        this.setState({
            gifs: newGifArray,
        });
    };

    render() {
        const { gifs } = this.state;
        // The spinner will only show properly on really slow internet connections.
        if (!this.state.loading) {
            return (
                <div className='trending'>
                    <form onSubmit={this.handleSearch}>
                        <button type='submit' style={{ float: 'right' }}>
                            &gt;
                        </button>
                        <div className='search-bar'>
                            <input
                                onChange={this.handleSearch}
                                style={{ width: '100%', height: '30px' }}
                            />
                        </div>
                    </form>
                    <div className='gif-items'>
                        {gifs.length ? (
                            gifs.map((gif, i) => (
                                <div key={i} className='item'>
                                    <img src={gif.images?.fixed_width?.url} />
                                </div>
                            ))
                        ) : (
                            <h1 style={{ color: '#fff' }}>No Gifs Found</h1>
                        )}
                    </div>
                    <div id='load-more'>
                        <button onClick={this.handleLoadMore}>Load More</button>
                    </div>
                </div>
            );
        } else {
            return <Spinner />;
        }
    }
}

export default Trending;
