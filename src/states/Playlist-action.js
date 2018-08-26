import { startLoading, endLoading } from 'states/page-action.js';
import { api } from 'states/Chartslist-action.js';

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
                
        api.chartFetcher.setPlaylistID(id).fetchTracks(length).then(response => {
            let playlist = response.data.data;
            console.log(playlist);
            let name = playlist.map((item)=> {return [item.album.artist.name.split("(")[0], item.name.split("(")[0]].join(" - ")});

            dispatch(loadPlaylist(name));
        }).then(() => dispatch(endLoading()))
    }
}