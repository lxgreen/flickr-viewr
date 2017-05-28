import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Transformer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            position: this.props.defaultPosition,
            rotation: this.props.defaultRotation,
            isRotating: false,
            dragStartPosition: {
                x: 0,
                y: 0
            }
        };
    }

    onDragStart = (e) => {
        e.preventDefault();
    };

    onMouseDown = (e) => {
        if (e.button !== 0) return;
        this.props.onMouseDown(e);

        const ref = ReactDOM.findDOMNode(this);
        const body = document.body;
        const box = ref.getBoundingClientRect();

        const cos = Math.cos(this.props.rotation);
        const sin = Math.sin(this.props.rotation);

        const boxCenter = {
            x: box.width / 2,
            y: box.height / 2
        };

        const rotationDiff = {
            x: box.left * cos + box.top * sin,
            y: -box.left * sin + box.top * cos
        };

        const relPosition = {
            x: e.pageX - rotationDiff.x - body.scrollLeft - body.clientLeft,
            y: e.pageY - rotationDiff.y - body.scrollTop - body.clientTop
        };


        this.setState({
            dragStartPosition: relPosition
        });

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
    };

    onMouseMove = (e) => {
        this.setState({
            position: {
                x: e.pageX - this.state.dragStartPosition.x,
                y: e.pageY - this.state.dragStartPosition.y
            }
        });
    };

    onMouseUp = (e) => {
        if (this.state.position.x !== this.props.defaultPosition.x ||
            this.state.position.y !== this.props.defaultPosition.y) {
                this.props.onMouseUp(this.state.position);
        }

        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
    };

    render() {

        const dragRotateStyle = {
            transform: `translate3d(${this.state.position.x}px, ${this.state.position.y}px, 0) rotateZ(${this.state.rotation}rad)`
        };

        return React.cloneElement(React.Children.only(this.props.children), {
            style: dragRotateStyle,
            onDragStart: this.onDragStart,
            onMouseDown: this.onMouseDown,
            onMouseUp: this.onMouseUp
        });
    }
}

Transformer.defaultProps = {
    position: {x: 0, y: 0},
    rotation: 0,
    onMouseDown: () => {},
    onMouseUp: () => {}
};

export default Transformer;