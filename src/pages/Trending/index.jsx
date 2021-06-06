import React, { Component } from 'react';

import fetchGifs from '../../helpers/fetchGifs';
import { Spinner } from '../../components/Spinner';
import { Button } from '../../components/ButtonOutlined';

import { VscSearch } from 'react-icons/vsc';

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
        window.scrollTo(0, 0);
        e.preventDefault();
        const gifs = await fetchGifs('search', this.searchInput?.value);
        const type = this.searchInput?.value ? 'search' : 'trending';

        this.setState({
            gifs,
            type,
        });
    };

    handleLoadMore = async (e) => {
        let gifs = await fetchGifs(
            this.state.type, // i.e. search
            this.searchInput?.value, // i.e. cat or '' if search bar is empty
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
        // The spinner will only show properly on really slow internet connections
        if (!this.state.loading) {
            return (
                <div className='trending'>
                    <form onSubmit={this.handleSearch}>
                        <button type='submit'>
                            <VscSearch />
                        </button>
                        <div className='search-bar'>
                            <input
                                placeholder='Search Gifs'
                                ref={(input) => {
                                    this.searchInput = input;
                                }}
                                onChange={this.handleSearch}
                            />
                        </div>
                    </form>
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
                                    <img
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
