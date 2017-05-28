import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Transformer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            position: this.props.defaultPosition,
            rotation: this.props.defaultRotation,
            startAngle: this.props.defaultRotation,
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

        this.props.onMouseDown(this.props.imageId);

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

    handleStartDrag = (e) => {
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

    handleStartRotate = (e) => {

        const ref = ReactDOM.findDOMNode(this);
        const box = ref.getBoundingClientRect();
        const {top, left, height, width} = box;

        const center = {
            x: left + (width / 2),
            y: top + (height / 2)
        };

        const x = e.clientX - center.x;
        const y = e.clientY - center.y;

        this.setState({
            center: center,
            startAngle: Math.atan2(y,x)
        });

        e.target.addEventListener('mousemove', this.onRotate);
        e.target.addEventListener('mouseup', this.onRotateStop);
        e.target.addEventListener('mouseleave', this.onRotateStop);
        e.preventDefault();
    };

    onRotate = (e) => {
        const x = e.clientX - this.state.center.x;
        const y = e.clientY - this.state.center.y;
        const delta = Math.atan2(y, x);

        this.setState({
            rotation: this.state.rotation + (delta - this.state.startAngle)/8
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