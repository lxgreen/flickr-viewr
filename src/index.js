import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {loadState, saveState} from './statePersistence';
import FlickrImageRetriever from './FlickrImageRetriever';
import StateInitializer from './StateInitializer';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const reducer = (state, action) => {
    switch(action.type) {
    case 'ACTIVATED':
        return {
            images: state.images,
            activeId: action.id
        };

    case 'DRAGGED':
        console.log('DRAGGED on ', action.id);
        console.log('DRAGGED to ', action.location);
        return {
            images: [
                ...state.images.filter(image => image.id !== action.id),
                Object.assign({},
                    state.images.filter(image => image.id === action.id)[0],
                    {location: action.location})
            ],
            activeId: action.id
        };

    case 'ROTATED':
        break;
    default:
        return state;
    }
};

let persistedState = loadState();

if(persistedState) {

    ReactDOM.render(
        <Provider store={createStore(reducer, persistedState)}>
            <App/>
        </Provider>
        , document.getElementById('root')
    );

} else {

    const imageRertriever = new FlickrImageRetriever('d42d6663662a1bc194868a305b79e9a6');
    const stateInitializer = new StateInitializer(imageRertriever, {x: 1024, y: 1024});

    stateInitializer.createState().then(initState => {

        saveState(initState);

        ReactDOM.render(
            <Provider store={createStore(reducer, initState)}>
                <App/>
            </Provider>
            , document.getElementById('root')
        );
    });
}

registerServiceWorker();