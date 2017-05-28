import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import ImageTile from './ImageTile';
import {saveState} from '../statePersistence';
import './App.css';



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

    render() {
        const {store} = this.context;
        const {images, activeId} = store.getState();
        return (
            <div>
              {
                  images.map(image =>
                    <ImageTile key={image.id}
                      url={image.url}
                      location={image.location}
                      rotation={image.rotation}
                      onLoad={() => {}}
                      onError={() => {}}
                      onDragStop={(e) => {
                          console.log('DRAGGED data: ', e);
                          store.dispatch({
                              type: 'DRAGGED',
                              id: image.id,
                              location: {x: e.x, y: e.y}
                          });
                      }}
                      onMouseDown={() => {
                          if(activeId !== image.id) {
                              console.log('ACTIVATED on ', image.id);
                              store.dispatch({type: 'ACTIVATED', id: image.id});
                          }

                      }}
                      isActive={image.id === activeId}/>
                  )
              }
            </div>
        );

    }
}

App.contextTypes = { store: PropTypes.object };

export default App;
