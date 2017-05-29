import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import ImageContainer from './ImageContainer';
import Spinner from './Spinner';
import {saveState} from '../statePersistence';

class App extends Component {

    componentWillMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(() => {
            saveState(store.getState());
            this.forceUpdate();
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    renderSpinner() {
        const {store} = this.context;
        const {imagesToResolve} = store.getState();

        if(imagesToResolve > 0) {
            return (
                <Spinner/>
            );
        } else return null;
    }

    render() {
        return (
            <div>
              {this.renderSpinner()}
              <ImageContainer/>
              }
            </div>
        );

    }
}

App.contextTypes = { store: PropTypes.object };

export default App;
