import React, { Component } from 'react';
import MainLayout from './layouts/Main';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Trending from './pages/Trending';

import './App.scss';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div id='app'>
                    <MainLayout>
                        <Routes>
                            <Route exact path='/' element={<Trending />} />
                        </Routes>
                    </MainLayout>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
