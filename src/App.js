import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initialData';
import Column from './Column';

class App extends Component {
  state = initialData;

  onDragEnd = result => {
    //TODO: reorder our columns
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
