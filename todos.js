let todos = []

function push(todo) {
  todos.push(todo)
}

function pop() {
  return todos.pop()
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
}

export { todos, push, pop, peek, isEmpty, size, clear }
