import React, { PureComponent, Component } from 'react';
import Task from './Task';
// import Column from './Column';

class InnerList extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }

  render() {
    console.log("render innerlist this.props", this.props)


    // const columnUpdate = this.props.columnOrder.map((columnId, index) => {
    //     const column = this.props.columns[columnId];
    //     const tasks = column.taskIds.map(taskId => this.props.tasks[taskId]);

    //     return <Column
    //       key={column.id}
    //       column={column}
    //       tasks={tasks}
    //       index={index}
    //     />;
    //   });

    return (
      this.props.tasks.map((task, index) =>
        <Task
          key={task.id}
          task={task}
          index={index} />
      ));
  }
}

export default InnerList;
