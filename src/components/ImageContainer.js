import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import ImageTile from './ImageTile';
import {saveState} from '../statePersistence';

class ImageContainer extends Component {

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
        document.addEventListener('contextmenu', (e) => e.preventDefault());

        const {store} = this.context;
        const {images, activeId} = store.getState();

        return (
            <div>
              { images.map(image => this.renderTile(image, activeId, store.dispatch)) }
            </div>
        );
    }

    renderTile(image, activeId, dispatch) {
        return (
            <ImageTile
                key={image.id}
                url={image.url}
                location={image.location}
                rotation={image.rotation}
                imageId={image.id}
                isActive={image.id === activeId}

                onLoad={() => {}}

                onError={() => {}}

                onRotateStop={(e) => dispatch({ type: 'ROTATED', id: e.id, rotation: e.rotation })}

                onDragStop={(e) => dispatch({type: 'DRAGGED', id: e.id, location: e.location })}

                onMouseDown={(id) => {
                    if(activeId !== id) {
                        dispatch({type: 'ACTIVATED', id: id});
                    }
                }}/>
        );
    }
}

ImageContainer.contextTypes = { store: PropTypes.object };

export default ImageContainer;
