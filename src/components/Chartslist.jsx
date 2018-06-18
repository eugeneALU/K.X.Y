import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getChartslist, setPlaylist } from 'states/Chartslist-action.js';
import { startLoading, endLoading, Ready } from 'states/page-action.js';

import Logo from 'components/Logo.jsx';

import './Chartslist.css';

class Chartslist extends React.Component {
    constructor(props) {
        super(props);

        this.click = this.click.bind(this);
        this.ready = this.ready.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(getChartslist());
    }

    render() {
        let showornot;
        let obj;

        if (!this.props.loading) {
            showornot = 'show';
        }
        else {
            showornot = 'notshow';
        }

        if (!this.props.ready) {
            obj = (
                <div id="waitpage">
                    <Logo />
                    <div>
                        <button id="readybutton" className={showornot} onClick={this.ready}>
                            Tap to START
                        </button>
                    </div>
                </div>
            );
        }
        else {
            let list = [];
            for (let i = 0; i < this.props.length; i++) {
                list.push(
                    <button className="selectlist" key={i} onClick={() => this.click(this.props.charts[i].id)}>
                        <span>{this.props.charts[i].title}</span>
                    </button>
                );
            }
            obj = (
                <div id="chartspage">
                    <div id="chartslist">
                        <Link to='/playlist' style={{ textDecoration: 'none' }}>
                            {list}
                        </Link>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {obj}
            </div>
        )
    }

    click(id) {
        this.props.dispatch(setPlaylist(id));
    }

    ready() {
        this.props.dispatch(Ready());
    }
}

export default connect(state => {
    return {
        ...state.charts,
        ...state.page
    };
})(Chartslist);