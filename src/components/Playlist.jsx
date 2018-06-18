import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import YouTubePlayer from 'react-player/lib/players/YouTube'

import { getPlaylist } from 'states/Playlist-action.js';
import { setSong, searchSong, setCurrentPlay, setPlay, setPlayMode } from 'states/YT-action.js';

import './Playlist.css';

const mode = ['sequence', 'random', 'loop'];
class Playlist extends React.Component {
    constructor(props) {
        super(props)

        this.playSong = this.playSong.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.previousSong = this.previousSong.bind(this)
        this.playing = this.playing.bind(this)
        this.changemode = this.changemode.bind(this)
    }

    componentWillMount() {
        this.props.dispatch(getPlaylist(this.props.track_id, this.props.playlist_length));
    }

    render() {
        let playlist = [];
        for (let i = 0; i < this.props.playlist_length; i++) {
            playlist.push(
                <button className="selectsong" key={i} onClick={() => this.playSong(this.props.playlist[i], i)}>
                    <span>{this.props.playlist[i]}</span>
                </button>
            );
        }
        let playURL = `https://www.youtube.com/embed/${this.props.video_ID}?autoplay=1`
        let play_pause_icon = this.props.playing ? "pause.svg" : "play-button.svg";
        let mode_icon = "compact-disc.svg";

        switch (this.props.play_mode) {
            case 'sequence':
                mode_icon = "compact-disc.svg";
                break;
            case 'random':
                mode_icon = "shuffle.svg";
                break;
            case 'loop':
                mode_icon = "repeat.svg";
        }

        return (
            <div id="playlist">
                <div id="backbutton">
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <button>
                            &laquo;<br />&laquo;<br />&laquo;<br />
                            &laquo;<br />&laquo;<br />
                        </button>
                    </Link>
                </div>
                <div id="list">
                    {playlist}
                </div>
                <div id="youtube">
                    <YouTubePlayer
                        className='youtube-player'
                        url={playURL}
                        onEnded={this.nextSong}
                        playing={this.props.playing}
                        width='100%'
                        height='80%'
                        controls
                        loop
                    />
                    <div id="control-panel">
                        <button id="previous-song" className="control-button" onClick={this.previousSong}>
                            <img src={"./image/" + "previous.svg"} className="control-icon" />
                        </button>
                        <button id="play-pause" className="control-button" onClick={this.playing}>
                            <img src={"./image/" + play_pause_icon} className="control-icon" />
                        </button>
                        <button id="next-song" className="control-button" onClick={this.nextSong}>
                            <img src={"./image/" + "next.svg"} className="control-icon" />
                        </button>
                        <button id="mode-select" className="control-button" onClick={this.changemode}>
                            <img src={"./image/" + mode_icon} className="control-icon" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    playSong(name, i) {
        console.log(name, i);
        this.props.dispatch(setCurrentPlay(i));
        this.props.dispatch(setSong(name));
        this.props.dispatch(searchSong(name));
    }

    nextSong() {
        let i;
        let name;
        switch (this.props.play_mode) {
            case 'sequence':
                i = this.props.current_play + 1;
                if (i > this.props.playlist_length) {
                    i = 0;
                }
                name = this.props.playlist[i];
                break;
            case 'loop':
                i = this.props.current_play
                name = this.props.playlist[i];
                break;
            case 'random':
                i = Math.floor((Math.random() * 50))
                name = this.props.playlist[i];
        }
        this.playSong(name, i)
    }

    previousSong() {
        let i;
        let name;
        switch (this.props.play_mode) {
            case 'sequence':
                i = this.props.current_play - 1;
                if (i < 0) {
                    i = 0;
                }
                name = this.props.playlist[i];
                break;
            case 'loop':
                i = this.props.current_play
                name = this.props.playlist[i];
                break;
            case 'random':
                i = Math.floor((Math.random() * 50))
                name = this.props.playlist[i];
        }
        this.playSong(name, i)
    }

    playing() {
        this.props.dispatch(setPlay(this.props.playing));
    }

    changemode() {
        let i;
        i = mode.findIndex((element) => { return (element == this.props.play_mode) })
        i = i + 1
        if (i > 2) {
            i = 0;
        }
        this.props.dispatch(setPlayMode(mode[i]));
    }
}

export default connect(state => {
    return {
        ...state.charts,
        ...state.playlist,
        ...state.yt
    };
})(Playlist)