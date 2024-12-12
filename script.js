import { todos, push } from './todos.js'

const $createTask = document.querySelector('#create-task')
$createTask.addEventListener('submit', handleCreateTask)

function handleCreateTask(e) {
  e.preventDefault()
  const elements = e.target.elements
  const text = elements.text.value
  const date = elements.date.value
  const start = elements.start.value
  const end = elements.end.value
  console.log(text, date, start, end)
  const newTodo = { text, date: new Date(date).toLocaleDateString(), start, end, done: false }
  push(newTodo)
}
