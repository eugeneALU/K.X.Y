import { Api } from '@kkbox/kkbox-js-sdk';
import { startLoading, endLoading } from 'states/page-action.js';

const clientID = '8634e87d9dabec76c517c1992e63a5c5';
const clientSecret = '902b9a0b619264ec7d2e65934efe0396';
const url = 'https://cors-anywhere.herokuapp.com/https://account.kkbox.com/oauth2/token/grant_type/client_credentials';
var access_token;
var api;

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
        fetch(url,{
            method: "POST",
            headers: {
                "Authorization": "Basic ODYzNGU4N2Q5ZGFiZWM3NmM1MTdjMTk5MmU2M2E1YzU6OTAyYjlhMGI2MTkyNjRlYzdkMmU2NTkzNGVmZTAzOTY=",
                "Content-Type": "application/x-www-form-urlencoded"
            },  
            body: JSON.stringify({
                'client_id': clientID,
                'client_secret': clientSecret
            })
        }).then(response => {
            response.json().then(data => {
                access_token = data["access_token"];
            }).then(()=>{
                api= new Api(access_token);
                api.chartFetcher.fetchCharts().then(response => {
                    let charts = response.data.data;
                    let length = charts.length;
                    
                    dispatch(getCharts(charts, length));
                }).then(()=>dispatch(endLoading()))
            });
        });
    };
}

export function setPlaylist(id) {
    return {
        type: '@CHARTS/setPlaylist',
        id
    };
}

export {api};