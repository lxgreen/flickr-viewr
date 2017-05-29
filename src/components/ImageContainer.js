import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import ImageTile from './ImageTile';

class ImageContainer extends Component {

    render() {
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

                onLoad={() => dispatch({type: 'IMAGE_LOADED'})}

                onError={() => dispatch({type: 'IMAGE_ERROR', id: image.id})}

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
