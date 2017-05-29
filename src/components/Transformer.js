import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Transformer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            position: this.props.defaultPosition,
            rotation: this.props.defaultRotation,
            initialAngle: 0,
            center: {
                x: 0,
                y: 0
            },
            dragStartPosition: {
                x: 0,
                y: 0
            }
        };
    }

    onDragStart = (e) => {
        e.preventDefault();
    };

    onContextMenu = (e) => {
        e.preventDefault();
    };

    onMouseDown = (e) => {

        const BUTTONS = {
            LEFT: 0,
            RIGHT: 2
        };

        // external mouse down
        this.props.onMouseDown(this.props.imageId);

        // dispatch buttons: left for dragging, right for rotation
        switch(e.button) {
        case BUTTONS.LEFT:
            this.handleStartDrag(e);
        break;

        case BUTTONS.RIGHT:
            this.handleStartRotate(e);
        break;

        default:
            break;
        }

        return e.preventDefault();
    };

    handleStartRotate = (e) => {

        // get element boundaries
        const ref = ReactDOM.findDOMNode(this);
        const box = ref.getBoundingClientRect();
        const {top, left, height, width} = box;

        // element center
        const center = {
            x: left + (width / 2),
            y: top + (height / 2)
        };

        // distance from center
        const x = e.clientX - center.x;
        const y = e.clientY - center.y;

        // save center and initial angle
        this.setState({
            center: center,
            initialAngle: Math.atan2(y,x)
        });

        e.target.addEventListener('mousemove', this.onRotate);
        e.target.addEventListener('mouseup', this.onRotateStop);
        e.target.addEventListener('mouseleave', this.onRotateStop);
        e.preventDefault();
    };

    onRotate = (e) => {

        // get current pointer distance from center
        const x = e.clientX - this.state.center.x;
        const y = e.clientY - this.state.center.y;

        // calculate angle delta from initial value
        const delta = Math.atan2(y, x) - this.state.initialAngle;

        // divided by 8 for smoother rotation
        this.setState({
            rotation: this.state.rotation + delta / 8
        });

        e.preventDefault();
    };

    onRotateStop = (e) => {
        if (this.state.rotation !== this.props.defaultRotation) {
            this.props.onRotateStop({
                rotation: this.state.rotation,
                id: this.props.imageId
            });
        }

        e.target.removeEventListener('mousemove', this.onRotate);
        e.target.removeEventListener('mouseup', this.onRotateStop);
        e.target.removeEventListener('mouseup', this.onRotateStop);
        e.preventDefault();
    };

    handleStartDrag = (e) => {

        // save distance from the current position to pointer
        this.setState({
            dragStartPosition: {
                x: e.pageX - this.state.position.x,
                y: e.pageY - this.state.position.y
            }
        });

        e.target.addEventListener('mousemove', this.onDrag);
        e.target.addEventListener('mouseup', this.onDragStop);
        e.target.addEventListener('mouseleave', this.onDragStop);
        e.preventDefault();
    };

    onDrag = (e) => {
        this.setState({
            position: {
                x: e.pageX - this.state.dragStartPosition.x,
                y: e.pageY - this.state.dragStartPosition.y
            }
        });
        e.preventDefault();
    };

    onDragStop = (e) => {
        if (this.state.position.x !== this.props.defaultPosition.x ||
            this.state.position.y !== this.props.defaultPosition.y) {
                this.props.onDragStop({
                    location: this.state.position,
                    id: this.props.imageId
                });
        }

        e.target.removeEventListener('mousemove', this.onDrag);
        e.target.removeEventListener('mouseup', this.onDragStop);
        e.target.removeEventListener('mouseleave', this.onDragStop);
        e.preventDefault();
    };

    render() {
        const dragRotateStyle = {
            transform: `translate3d(${this.state.position.x}px, ${this.state.position.y}px, 0) rotateZ(${this.state.rotation}rad)`
        };

        // apply transformations on child element
        return React.cloneElement(React.Children.only(this.props.children), {
            style: dragRotateStyle,
            onMouseDown: this.onMouseDown,
            onDragStart: this.onDragStart,
            onContextMenu: this.onContextMenu
        });
    }
}

Transformer.defaultProps = {
    position: {x: 0, y: 0},
    rotation: 0,
    onMouseDown: () => {},
    onDragStop: () => {},
    onRotateStop: () => {}
};

export default Transformer;