import React, { Component } from 'react';

import fetchGifs from '../../helpers/fetchGifs';
import { Spinner } from '../../components/Spinner';
import { Button } from '../../components/ButtonOutlined';

import './index.scss';
import SearchBar from '../../components/SearchBar';
import Gif from '../../components/Gif';

class Trending extends Component {
    state = {
        gifs: [],
        loading: true,
        type: '',
    };

    async componentDidMount() {
        window.scrollTo(0, 0);
        const gifs = await fetchGifs('trending');
        this.setState({
            gifs,
            loading: false,
            type: 'trending',
        });
    }

    handleSearch = async (value) => {
        window.scrollTo(0, 0);
        const gifs = await fetchGifs('search', value);
        const type = value ? 'search' : 'trending';

        this.setState({
            gifs,
            type,
        });
    };

    handleLoadMore = async () => {
        const gifs = await fetchGifs(
            this.state.type, // e.g. search but defaults to trending
            this.searchInput?.value, // e.g. cat
            this.state.gifs.length + 25
        );
        // I use the offset param in the api to load 20 more gifs
        const newGifArray = [...this.state.gifs, ...gifs];
        this.setState({
            gifs: newGifArray,
        });
    };

    render() {
        const { gifs } = this.state;
        // The spinner will only show properly on really slow internet connections
        if (!this.state.loading) {
            return (
                <div className='trending'>
                    <SearchBar
                        debounceDelay={500}
                        onTypingEnd={this.handleSearch}
                        innerRef={(input) => {
                            this.searchInput = input;
                        }}
                        placeholder='Search gifs...'
                    />

                    {this.searchInput?.value ? (
                        <h3 style={{ color: '#fff' }}>
                            Showing Results For {this.searchInput?.value}
                        </h3>
                    ) : (
                        <h3 style={{ color: '#fff' }}>Trending Gifs</h3>
                    )}
                    <div className='gif-items'>
                        {gifs.length ? (
                            gifs.map((gif, i) => (
                                <div key={i} className='gif'>
                                    <Gif
                                        key={i}
                                        src={gif.images?.fixed_width?.url}
                                    />
                                </div>
                            ))
                        ) : (
                            <h1 style={{ color: '#fff' }}>No Gifs Found</h1>
                        )}
                    </div>
                    <div id='load-more'>
                        <Button onClick={this.handleLoadMore}>Load More</Button>
                    </div>
                </div>
            );
        } else {
            return <Spinner />;
        }
    }
}

export default Trending;
