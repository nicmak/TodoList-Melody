import { createComponent, render } from 'melody-component'
import { bindEvents, lifecycle } from 'melody-hoc';
import { RECEIVE_PROPS } from 'melody-component';
import { connect } from 'melody-redux'
import logger from 'redux-logger'
import { applyMiddleware } from 'melody-util';
import uuidv1 from 'uuid/v1';

import { todoReducer } from '../../Reducers/todoReducer'
import { isEnabled } from '../../Feature/index.js'
import template from './TodoList.twig'

import {
  addItemAction,
  textChangeAction,
  toggleDoneAction,
  filterStatusAction
} from '../../Actions/TodoActions.js'
import { renderBottomAction, hideFilterAction, showFilterTopAction } from '../../Actions/featureActions.js'

const mapStateToProps = (state) => {
  const { todos, inputText, filterStatus } = state.todoReducer
  const { renderBottom, filterAvail } = state.featureReducer
  return {
    todos,
    inputText,
    filterStatus,
    renderBottom,
    filterAvail
  }
}

const showTop = () => {
  const List = document.getElementsByClassName("TodoList-Items")[0]
  List.scrollTo(0, 0)
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (inputText, allTodos) => {
      dispatch(addItemAction(inputText));
      saveTodos(allTodos)
      showTop()
    },
    handleTextChange: (value) => {
      dispatch(textChangeAction(value))
    },
    toggleCompleteTodo: (value, allTodos) => {
      dispatch(toggleDoneAction(value))
      saveTodos(allTodos)
    },
    filterChange: (status) => {
      dispatch(filterStatusAction(status))
      showTop()
    },
    enableRenderBottom: () => {
      dispatch(renderBottomAction())
    },
    hideFilter: () => {
      dispatch(hideFilterAction())
    }
  }
}

const saveTodos = (array) => {
  window.localStorage.setItem('todos', JSON.stringify(array))
}
const lifeCycleEnhance = lifecycle({
  componentDidMount() {
    if (isEnabled('renderBottom')) {
      this.props.enableRenderBottom()
    }

    if (!process.env.filterAvail) {
      this.props.hideFilter()
    }
  }
})

const enhance = bindEvents({
  form: {
    submit(event, { props }) {
      event.preventDefault();
      const { inputText, todos } = props
      if (!inputText) return;
      props.addItem(inputText, todos)
    }
  },
  input: {
    input(event, { props }) {
      props.handleTextChange(event.target.value)
    }
  },
  test: {
    click(event, { props }) {
      props.toggleCompleteTodo(event.target.value, props.todos)
    }
  },
  filter: {
    click(event, { props }) {
      event.preventDefault()
      let status
      switch(event.target.value) {
        case 'false':
          status = false
          break
        case 'true':
          status = true
          break
        default:
          status = null
      }
      props.filterChange(status)
    }
  }
});

const TodoList = enhance(lifeCycleEnhance(createComponent(template)));


export default connect(mapStateToProps, mapDispatchToProps)(TodoList)


