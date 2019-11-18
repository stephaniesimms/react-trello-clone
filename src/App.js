import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import initialData from './initialData';
import Column from './Column';


const Container = styled.div`
  display: flex;
`;
class App extends Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    // if destination is out of bounds, return
    if (!destination) {
      return;
    }

    // if user dropped into same position, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // otherwise, update state to reflect drag/drop action
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    
    if (start === finish) {
      this.moveTaskToSameList(start, source, destination, draggableId);
    } else {
      this.moveTaskToDifferentList(start, finish, source, destination, draggableId)
    }
  }

  moveTaskToSameList(start, source, destination, draggableId) {
    const newTaskIds = start.taskIds;
    
    // rearrange taskIds in list
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      taskIds: newTaskIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      },
    };

    this.setState(newState);
  }
  
  moveTaskToDifferentList(start, finish, source, destination, draggableId) {
    // remove task from start tasks
    const newStartTaskIds = start.taskIds;
    newStartTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...start,
      taskIds: newStartTaskIds
    }

    // add task to finish tasks
    const newFinishTaskIds = finish.taskIds;
    newFinishTaskIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finish,
      taskIds: newFinishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn
      },
    };

    this.setState(newState);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

            return <Column
              key={column.id}
              column={column}
              tasks={tasks}
            />;
          })};
        </Container>
      </DragDropContext>
    )
  }
}

export default App;
