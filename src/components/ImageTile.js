import React from 'react';
import classNames from 'classnames';
import Transformer from './Transformer';

import './ImageTile.css';

const ImageTile = ({
    url,
    location,
    rotation,
    onLoad,
    onError,
    onDragStop,
    onMouseDown,
    isActive}) => (
    <Transformer
        defaultPosition={{x: location.x, y: location.y}}
        defaultRotation={rotation}
        onMouseUp={onDragStop}
        onMouseDown={onMouseDown}>
        <img className={classNames({'image-tile': true, 'active': isActive === true})}
            src={url}
            onLoad={onLoad}
            onError={onError} />
    </Transformer>
);

export default ImageTile;