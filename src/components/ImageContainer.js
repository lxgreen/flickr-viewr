import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import ImageTile from './ImageTile';

const mapStateToProps = (image) => {
    console.log(image);
    return {
        url: image.url,
        location: image.location,
        rotation: image.rotation,
        isActive: image.isActive
    };
};

const mapDispatchToProps = () => {};


const ImageConatiner = connect(mapStateToProps, mapDispatchToProps)(ImageTile);

export default ImageConatiner;