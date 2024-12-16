import React from 'react';
import CheckBox from './CheckBox';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      tempPriority: props.data.priority,
      tempChecked: props.data.completed,
      tempDueDate: props.data.dueDate || '', 
    };
  }

  handleChange = (checked) => {
    this.setState({ showDialog: true, tempChecked: checked });
  };

  handleConfirm = () => {
    const { changeStatus, data } = this.props;
    const { tempChecked, tempDueDate, tempPriority} = this.state;

    changeStatus(data.id, tempChecked, tempDueDate, tempPriority); // Pass due date to the parent component
    this.setState({ showDialog: false });
  };



  handleCancel = () => {
    this.setState({ showDialog: false, tempChecked: this.props.data.completed, tempDueDate: this.props.data.dueDate, tempPriority: this.props.data.priority });
  };

  handleDueDateChange = (event) => {
    this.setState({ tempDueDate: event.target.value });
  };

  handlePriorityChange = (newPriority) => {
    this.setState({ tempPriority: newPriority });
  };

  render() {
    const { data } = this.props;
    const { showDialog, tempChecked, tempDueDate, tempPriority } = this.state;

    const className =
      'todo-item ui-state-default ' +
      (data.completed === true ? 'completed' : 'pending');

    return (
      <li className={className}>
        <div className="checkbox">
          <label>
            <CheckBox checked={tempChecked} onChange={this.handleChange} />{' '}
            {data.text}
          </label>
        </div>
        <div>
          Priority: {tempPriority}
          <button onClick={() => this.handlePriorityChange('High')}>High</button>
          <button onClick={() => this.handlePriorityChange('Medium')}>Medium</button>
          <button onClick={() => this.handlePriorityChange('Low')}>Low</button>
        </div>
        {/* Due Date Field */}
        <div className="due-date">
          <label>Due Date:</label>
          <input 
            type="date" 
            value={tempDueDate} 
            onChange={this.handleDueDateChange} 
          />
        </div>

        {/* Confirmation Dialog */}
        {showDialog && (
          <div className="dialog">
            <p>Mark this task as {tempChecked ? 'completed' : 'pending'}?</p>
            <button onClick={this.handleConfirm}>Confirm</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        )}
      </li>
    );
  }
}


