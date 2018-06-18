import React from 'react';
import { connect } from 'react-redux';
import { Router, Route} from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";

import Chartslist from 'components/Chartslist.jsx';
import Playlist from 'components/Playlist.jsx';

const history = createBrowserHistory();

class Mainpage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Route exact path='/' render={() => (
                        <Chartslist />
                    )} />
                    <Route exact path="/playlist" render={() => (
                        <Playlist />
                    )} />
                </div>
            </Router>
        );
    }
}

export default connect(state => {
    return {
        ...state.page,
        ...state.charts
    };
})(Mainpage);

