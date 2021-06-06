import './Main.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
    render() {
        return (
            <div className='wrapper'>
                <header>
                    <Link to='/'>
                        <img
                            className='logo-img'
                            src={'/gif-logo.gif'}
                            alt='Giphy Logo'
                        />
                    </Link>
                </header>
                <main>{this.props.children}</main>
            </div>
        );
    }
}

export default Main;
