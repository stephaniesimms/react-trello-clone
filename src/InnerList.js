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
