import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initialData';
import Column from './Column';

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
    // const start = this.state.columns[source.droppableId];
    // const finish = this.state.columns[destination.droppableId];
    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map(columnId => {
          const column = this.state.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

          return <Column
            key={column.id}
            column={column}
            tasks={tasks}
          />;
        })};
      </DragDropContext>
    )
  }
}

export default App;
