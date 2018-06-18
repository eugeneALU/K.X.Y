import { Api } from '@kkbox/kkbox-js-sdk';
import { startLoading, endLoading } from 'states/page-action.js';

const access_token = "RfHu3eDzArozBvNsspS+tw==";
const api = new Api(access_token);

function loadPlaylist(playlist) {
    return {
        type: '@PLAYLIST/loadPlaylist',
        playlist
    };
}

export function setPlaylistLength(length) {
    return {
        type: '@PLAYLIST/setPlaylistLength',
        length
    };
}

export function getPlaylist(id, length) {
    return (dispatch) => {
        dispatch(startLoading());

        //limit: number, offset: number
        api.chartFetcher.setPlaylistID(id).fetchTracks(length).then(response => {
            let playlist = response.data.data;
            let name = playlist.map((item)=> {return [item.album.artist.name.split("(")[0], item.name.split("(")[0]].join(" - ")});

            dispatch(loadPlaylist(name));
        }).then(() => dispatch(endLoading()))
    };
}