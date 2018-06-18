const initMainState = {
    loading: false,
    ready: false,
};

export function page(state = initMainState, action) {
    switch (action.type) {
        case '@PAGE/startLoading':
            return {
                ...state,
                loading: true
            };

        case '@PAGE/endLoading':
            return {
                ...state,
                loading: false
            };

        case '@PAGE/Ready':
            return {
                ...state,
                ready: true
            };
        default:
            return state;
    }
}