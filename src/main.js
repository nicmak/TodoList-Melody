import { createComponent, render } from 'melody-component'
import { provide } from 'melody-redux'
import TodoList from './Components/TodoList/index.js'
import template from './main.twig'
import store from './Store.js'
import './main.scss'

const documentRoot = document.getElementById('root');
const main = createComponent(template);


render(documentRoot, provide(store, main));

