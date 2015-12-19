import React from 'react';
import ReactDom from 'react-dom';
import { ItemTypes } from '../Constants';
import { DropTarget } from 'react-dnd';
import { ADD_COMPONENT } from '../actions/mockupActions';

const componentTarget = {
    drop: function (props, monitor, component) {
        // trigger the add component action
        if(!props.actions || !props.actions.addComponent) {
            throw Error('Surface is not receiving the component actions');
        }

        var clientOffset = monitor.getClientOffset();
        let offsetX = clientOffset.x;
        let offsetY = clientOffset.y;

        var rect = ReactDom.findDOMNode(component).getBoundingClientRect();
        let left = rect.left;
        let top = rect.top;

        let mockupName = props.mockup.name;
        let position = {
            x : offsetX - left,
            y: offsetY - top
        };
        let componentType = monitor.getItem().type;

        // trigger the action
        props.actions.addComponent(mockupName, componentType, position);
    }
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

var Surface = React.createClass({

    propTypes: {
        actions: React.PropTypes.object.isRequired,
        mockup: React.PropTypes.object.isRequired
    },

    render: function () {

        const { connectDropTarget, isOver } = this.props;
        return connectDropTarget(
            <div className="surface">
            </div>
        );
    }
});

export default DropTarget(ItemTypes.COMPONENT, componentTarget, collect)(Surface);