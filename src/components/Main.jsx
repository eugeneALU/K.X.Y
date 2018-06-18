import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import { page } from 'states/page-reducers.js';
import { charts } from 'states/Chartslist-reducers.js';
import { playlist } from 'states/Playlist-reducers.js';
import { yt } from 'states/YT-reducers.js';

import Mainpage from 'components/Mainpage.jsx';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.store = null;
    }

    componentWillMount() {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        this.store = createStore(combineReducers({
            page,
            charts,
            playlist,
            yt
        }), composeEnhancers(applyMiddleware(thunkMiddleware)));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Mainpage />
            </Provider>
        );
    }
}