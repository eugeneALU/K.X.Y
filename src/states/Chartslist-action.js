import { Auth } from '@kkbox/kkbox-js-sdk';
import { Api } from '@kkbox/kkbox-js-sdk';
import { startLoading, endLoading } from 'states/page-action.js';

const clientID = '8634e87d9dabec76c517c1992e63a5c5';
const clientSecret = '902b9a0b619264ec7d2e65934efe0396';
const access_token = "RfHu3eDzArozBvNsspS+tw==";
const api = new Api(access_token);

function getCharts(charts, length) {
    return {
        type: '@CHARTS/getCharts',
        charts,
        length
    };
}

export function getChartslist() {
    return (dispatch, getState) => {
        dispatch(startLoading());

        api.chartFetcher.fetchCharts().then(response => {
            let charts = response.data.data;
            let length = charts.length;
            
            dispatch(getCharts(charts, length));
        }).then(()=>dispatch(endLoading()))
    };
}

export function setPlaylist(id) {
    return {
        type: '@CHARTS/setPlaylist',
        id
    };
}