*Personal Project --　React and web frontened learning*
# Name: K.X.Y

# Desvription: KKBOX playlist + Youtube vidio fetch

# Usage:
    1. install Node.js 
    2. npm install -- install necessary package 
    3. npm run start -- start server on localhost:8080
# Todo:
    1. Using TensorFlow.js - Dynamic change background style that fit the music style

# Reminder:
    1. using Webpack
        **HOW TO USE Webpack : https://ithelp.ithome.com.tw/articles/10193608**
    2. using ESlint
    3. using *FETCH* to access YouTube API
    4. manually get token to access KKBOX API, since officital way {Auth} need more work on proxy
    5. using HashRouter instead of BrowserRouter to validate github page

# way to get access_token
    ```
    1. common line tool : 
        ```
        curl -u "8634e87d9dabec76c517c1992e63a5c5:902b9a0b619264ec7d2e65934efe0396" --data-urlencode "grant_type=client_credentials" https://account.kkbox.com/oauth2/token
        ```
    2. integrate with fetch to fetch new token(not expired) 
        https://stackoverflow.com/questions/30203044/using-an-authorization-header-with-fetch-in-react-native
    3. To deal with CORB
    　　use CORB proxy :https://crossorigin.me/
    4. Import api object to playlist directly from chartlist, avoid do the same fetch again.
       Side Effect: must go back to main page to get Token when refresh the page. 
    ``` 

