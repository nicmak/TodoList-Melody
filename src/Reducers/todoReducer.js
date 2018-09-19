import { RECEIVE_PROPS } from 'melody-component';

const checkLocalStorage = () => {
  if (window.localStorage.getItem('todos')) {
    return JSON.parse(window.localStorage.getItem('todos'))
  } else {
    return []
  }
}

const initialState = {
  todos: checkLocalStorage(),
  inputText: '',
  filterStatus: null,
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PROPS: return { ...state, ...action.payload };

    case 'TEXT_CHANGE': return { ...state, inputText: action.inputText };

    case 'ADD_TODO':
      const { todos } = state;
      return { ...state,
        todos: state.todos.concat(action.task),
        inputText: ''
      };
    case 'FILTER_STATUS':
      return {
        ...state,
        filterStatus: action.filterStatus
      }
    case 'TOGGLE_DONE':
      return {
        ...state,
          todos: state.todos.map((todo) => {
            if (todo.id === action.toggleID) {
              return {
                ...todo, done: !(todo.done)
              }
            } else {
              return todo
            }
          })
      }
  }
  return state;
};

