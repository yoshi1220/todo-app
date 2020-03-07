import React from 'react';
import './App.css';
import './todo.scss';
import MainArea from './components/mainArea';
import SideArea from './components/sideArea';
import { findAllByDisplayValue } from '@testing-library/react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupList: [
        {
          id: "inbox",
          label: "受信箱"
        },
        {
          id: "group-1",
          label: "グループ1"
        }
      ],
      todoList: {
        "inbox": [
          { label: "Todo1", id: "item-1", complete: false },
          { label: "Todo2", id: "item-2", complete: false },
        ],
        "group-1": [
          { label: "Todo3", id: "item-4", complete: false },
          { label: "Todo4", id: "item-3", complete: false },
        ]
      },
      selectedGroup: "inbox",
      todoCount: 4,
    }
  }

  onAddTodo(label) {
    let _state = Object.assign({}, this.state);
    _state.todoCount++;
    let todoList = _state.todoList[_state.selectedGroup];
    let todoItem = {
      label: label,
      id: "item-" + _state.todoCount,
      complete: false
    }
    todoList.push(todoItem);
    this.setState(_state);
  }

  onCompleteTodo(id) {
    let _state = Object.assign({}, this.state);
    let todoList = _state.todoList[_state.selectedGroup];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        todoList[i].complete = true;
        break;
      }
    }
    this.setState(_state);
  }

  onDeleteTodo(id) {
    let _state = Object.assign({}, this.state);
    let todoList = _state.todoList[_state.selectedGroup];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        todoList.splice(i, 1);
        break;
      }
    }
    this.setState(_state);
  }

  onSelectGroup(id) {
    console.log("onSelectGroup", id);
    this.setState({selectedGroup: id})
  }

  render() {
    return (
      <div className = "wrap">
        <SideArea
          groupList={this.state.groupList}
          onSelect={this.onSelectGroup.bind(this)}/>
        <MainArea
          todoList={this.state.todoList[this.state.selectedGroup]}
          onAddTodo={this.onAddTodo.bind(this)}
          onCompleteTodo={this.onCompleteTodo.bind(this)}
          onDeleteTodo={this.onDeleteTodo.bind(this)}
        />
      </div>
    );
  }
}