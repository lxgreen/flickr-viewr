import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {loadState, saveState} from './statePersistence';
import FlickrImageRetriever from './FlickrImageRetriever';
import StateInitializer from './StateInitializer';
import {reducer} from './reducer';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';

(function(){

    const persistedState = loadState();

    if(persistedState) {

        renderApp(persistedState);

    } else {

        const imageRertriever = new FlickrImageRetriever('d42d6663662a1bc194868a305b79e9a6');
        const stateInitializer = new StateInitializer(imageRertriever, {x: 1024, y: 1024});

        stateInitializer.createState().then(initState => {
            saveState(initState);
            renderApp(initState);
        });

    }

    document.addEventListener('contextmenu', (e) => e.preventDefault());

    // create-react-app stuff
    registerServiceWorker();
})();

function renderApp(state) {
    ReactDOM.render(
        <Provider store={createStore(reducer, state)}>
            <App/>
        </Provider>
        , document.getElementById('root')
    );
}