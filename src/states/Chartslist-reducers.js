const initChartsState = {
    charts: [],
    length: 0,
    track_id: null
};

export function charts(state = initChartsState, action) {
    switch (action.type) {
        case '@CHARTS/getCharts':
            return {
                ...state,
                charts: action.charts,
                length: action.length
            };

        case '@CHARTS/setPlaylist':
            return {
                ...state,
                track_id: action.id
            };

        default:
            return state;
    }
}