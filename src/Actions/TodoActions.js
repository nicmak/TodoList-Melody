const uuidv1 = require('uuid/v1');

export const addItemAction = (inputText) => {
  return {
    type: 'ADD_TODO',
    task: {
      id: uuidv1(),
      text: inputText,
      done: false
    }
  }
}

export const textChangeAction = (value) => {
  return {
    type: 'TEXT_CHANGE',
    inputText: value
  }
}

export const toggleDoneAction = (value) => {
  return {
    type: 'TOGGLE_DONE',
    toggleID: value
  }
}

export const filterStatusAction = (value) => {
  return {
    type: 'FILTER_STATUS', filterStatus: value
  }
}

