import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { onError } from "apollo-link-error";
import { Provider } from 'react-redux'
import {store} from './store'
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import {createHttpLink} from "apollo-link-http";
import { setContext } from 'apollo-link-context'
import {AUTH_TOKEN} from "./constants";
import {InMemoryCache} from "apollo-cache-inmemory";
// import {ApolloProvider} from 'react-apollo'
// import {InMemoryCache} from 'apollo-cache-inmemory'
// import {createHttpLink} from "apollo-link-http";
// import {setContext} from 'apollo-link-context'
// import {AUTH_TOKEN} from './constants'
// import {gql} from "apollo-boost";


const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:8000/graphql/'
    // uri: 'http://192.168.1.66:8000/graphql/'
    // uri: 'http://192.168.215.98:8000/graphql/'
    // uri: 'http://3.22.245.121:8000/graphql/'
    // uri: 'http://192.168.137.1:8000/graphql/'
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            Authorization: token ? `JWT ${token}` : 'JWT '
        }
    }
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>

                console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache: cache
});

cache.writeData({
    data: {
        title: 'Сарансккабель',
        searchMachine: '',
        // todos: [],
        // visibilityFilter: 'SHOW_ALL',
        // networkStatus: {
        //     __typename: 'NetworkStatus',
        //     isConnected: false,
        // },
    },
});

// const socket = new WebSocket("ws://127.0.0.1:8000/ws/subscribe/mass_meter/");

// // обработчик входящих сообщений
// socket.onmessage = function(event) {
//     let incomingMessage = event.data;
//     console.log("ws: "+incomingMessage);
// };

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
