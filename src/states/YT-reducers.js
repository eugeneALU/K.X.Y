const initYTState = {
    song_name: '',
    YT_loading: false,
    video_ID: 'PStGUXZ3sck',
    current_play: -1,
    play_mode: 'sequence',
    playing: true,
    loop: true
}

export function yt(state = initYTState, action) {
    switch (action.type) {
        case '@YT/setSong':
            return {
                ...state,
                song_name: action.name
            };

        case '@YT/setCurrentPlay':
            return {
                ...state,
                current_play: action.i
            };

        case '@YT/setPlay':
            return {
                ...state,
                playing: !(action.playing)
            };

        case '@YT/startLoading':
            return {
                ...state,
                YT_loading: true
            };

        case '@YT/endLoading':
            return {
                ...state,
                YT_loading: false
            };

        case '@YT/setVideoId':
            return {
                ...state,
                video_ID: action.id
            };

        case '@YT/setPlayMode':
            return {
                ...state,
                play_mode: action.mode
            };

        default:
            return state;
    }
}