import React from 'react';
import classNames from 'classnames';
import Transformer from './Transformer';

import './ImageTile.css';

const ImageTile = ({
    url,
    location,
    rotation,
    imageId,
    onLoad,
    onError,
    onDragStop,
    onMouseDown,
    onRotateStop,
    isActive}) => (
    <Transformer
        imageId={imageId}
        defaultPosition={location}
        defaultRotation={rotation}
        onDragStop={onDragStop}
        onMouseDown={onMouseDown}
        onRotateStop={onRotateStop}>
        <img className={classNames({'image-tile': true, 'active': isActive})}
            src={url}
            onLoad={onLoad}
            onError={onError} />
    </Transformer>
);

export default ImageTile;