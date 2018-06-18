const baseSearchURL = 'https://www.googleapis.com/youtube/v3/search?';
const API_KEY = 'AIzaSyD6C7tSP4E8GpKQkQzupX46ybdZ5CcBOLs';
const setting = '&type=video&order=relevance';

export function setSong(name) {
    return {
        type: '@YT/setSong',
        name
    };
}

export function setCurrentPlay(i) {
    return {
        type: '@YT/setCurrentPlay',
        i
    };
}

export function setPlay(playing) {
    return {
        type: '@YT/setPlay',
        playing
    };
}

export function setPlayMode(mode) {
    return {
        type: '@YT/setPlayMode',
        mode
    };
}

function YTstartLoading() {
    return {
        type: '@YT/startLoading',
    }
}

function YTendLoading() {
    return {
        type: '@YT/endLoading',
    }
}

function YTsetVideoId(id) {
    return {
        type: '@YT/setVideoId',
        id
    }
}

export function searchSong(name) {
    var url = `${baseSearchURL}q=${name}&maxResults=2&part=snippet&key=${API_KEY}${setting}`;
    console.log(url);
    console.log("Search:", name);
    return (dispatch) => {
        dispatch(YTstartLoading());

        fetch(url, {
            method: 'GET'
        }).then(response => {
            response.json().then((data) => {
                dispatch(YTsetVideoId(data.items[0].id.videoId))
            })
        }).catch(error => {
            console.log(`ERROR when search ${name}:`, error)
        }).then(() => dispatch(YTendLoading()))
    };
}