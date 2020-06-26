import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import {store} from './store'

// import {ApolloProvider} from 'react-apollo'
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import {createHttpLink} from "apollo-link-http";
import { setContext } from 'apollo-link-context'
import {AUTH_TOKEN} from "./constants";
import {InMemoryCache} from "apollo-cache-inmemory";
// import {InMemoryCache} from 'apollo-cache-inmemory'
// import {createHttpLink} from "apollo-link-http";
// import {setContext} from 'apollo-link-context'
// import {AUTH_TOKEN} from './constants'
// import {gql} from "apollo-boost";


const httpLink = createHttpLink({
    uri: 'http://192.168.1.66:8000/graphql/'
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            Authorization: token ? `JWT ${token}` : ''
        }
    }
});

const client = new ApolloClient({
    // uri: 'http://localhost:8000/graphql/',
    // uri: 'http://192.168.1.66:8000/graphql/',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

// client
// .query({
//     query: gql`
//         {
//             machines {
//                 id
//                 name
//             }
//         }
//     `
// })
// .then(result => console.log(result));

const render = () => ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
