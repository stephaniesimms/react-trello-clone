import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';


// update bg-color based on drag state, using snapshot
const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

class Task extends Component {
  
  render() {
    const { task, index } = this.props;
    
    return (
      <Draggable 
        draggableId={task.id}
        index={index}
      >
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps} // allows component to be draggable
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}

export default Task;
