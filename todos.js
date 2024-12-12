let todos = []

const savedTodos = localStorage.getItem('todos')
if (savedTodos) {
  todos = JSON.parse(savedTodos)
  if (!todos.length) seed()
} else {
  seed()
}

function seed() {
  push({ done: false, text: 'Estudar JavaScript', date: '2024-01-12', start: '08:00', end: '12:00' })
  push({ done: false, text: 'Estudar CSS', date: '2024-02-12', start: '09:00', end: '12:00' })
  push({ done: false, text: 'Estudar HTML', date: '2024-03-12', start: '10:00', end: '12:00' })
  push({ done: false, text: 'Estudar React', date: '2024-04-12', start: '09:30', end: '12:00' })
  push({ done: false, text: 'Estudar Next.js', date: '2024-05-12', start: '13:00', end: '15:00' })
  push({ done: false, text: 'Estudar Node.js', date: '2024-06-12', start: '14:00', end: '18:00' })
  push({ done: false, text: 'Estudar TypeScript', date: '2024-07-12', start: '08:00', end: '12:00' })
  push({ done: false, text: 'Estudar Python', date: '2024-08-12', start: '08:00', end: '12:00' })
}

function push(todo) {
  todos.push(todo)
  save()
}

function pop() {
  const r = todos.pop()
  save()
  return r
}

function peek() {
  return todos[size() - 1]
}

function isEmpty() {
  return size() === 0
}

function size() {
  return todos.length
}

function clear() {
  todos = []
  save()
}

function remove(todo) {
  const index = todos.indexOf(todo)
  todos.splice(index, 1)
  save()
}

function save() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

export { todos, push, pop, peek, isEmpty, size, clear, remove, save }
