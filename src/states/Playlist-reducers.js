const initPlaylistState = {
    playlist: [],
    playlist_length: 50,
    youtubeDone: false
}

export function playlist(state = initPlaylistState, action) {
    switch (action.type) {
        case '@PLAYLIST/startYoutubeLoading':
            return {
                ...state,
                youtubeDone: false
            };

        case '@PLAYLIST/endYoutubeLoading':
            return {
                ...state,
                youtubeDone: true
            };

        case '@PLAYLIST/loadPlaylist':
            return {
                ...state,
                playlist: action.playlist
            };

        case '@PLAYLIST/setPlaylistLength':
            return {
                ...state,
                playlist_length: action.length
            };

        default:
            return state;
    }
}