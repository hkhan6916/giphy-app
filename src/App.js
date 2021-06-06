import React, { Component } from 'react';
import MainLayout from './layouts/Main';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Trending from './pages/Trending';

import './App.scss';

class App extends Component {
    render() {
        return (
            <Router>
                <div id='app'>
                    <MainLayout>
                        <Switch>
                            <Route exact path='/' component={Trending} />
                        </Switch>
                    </MainLayout>
                </div>
            </Router>
        );
    }
}

export default App;
