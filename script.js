import { todos, push, remove, save } from './todos.js'

const $createTask = document.querySelector('#create-task')
const $todos = document.querySelector('#todos')
const $taskEditModal = document.querySelector('#task-edit-modal')
const $taskDeleteModal = document.querySelector('#task-delete-modal')

$createTask.addEventListener('submit', handleCreateTask)

function handleCreateTask(e) {
  e.preventDefault()
  const elements = e.target.elements
  const text = elements.text.value
  const date = elements.date.value
  const start = elements.start.value
  const end = elements.end.value
  const newTodo = { text, date, start, end, done: false }
  push(newTodo)
  showTasks()
  e.target.reset()
}

function handleTaskDone(todo, done) {
  todo.done = done
  showTasks()
  save()
}

function handleEditTask(todo) {
  const $closeModal = $taskEditModal.querySelector('.close-modal')
  const $form = $taskEditModal.querySelector('#edit-task')
  const $text = $taskEditModal.querySelector('[name="text"]')
  const $date = $taskEditModal.querySelector('[name="date"]')
  const $start = $taskEditModal.querySelector('[name="start"]')
  const $end = $taskEditModal.querySelector('[name="end"]')

  $text.value = todo.text
  $date.value = new Date(todo.date).toISOString().split('T')[0]
  $start.value = todo.start
  $end.value = todo.end

  function close() {
    $taskEditModal.close()
    $closeModal.removeEventListener('click', close)
    $taskEditModal.removeEventListener('click', submit)
  }

  function submit(e) {
    e.preventDefault()
    const elements = e.target.elements
    todo.text = elements.text.value
    todo.date = new Date(elements.date.value).toLocaleDateString()
    todo.start = elements.start.value
    todo.end = elements.end.value
    save()
    $taskEditModal.close()
    showTasks()
    $closeModal.removeEventListener('click', close)
    $taskEditModal.removeEventListener('click', submit)
  }

  $closeModal.addEventListener('click', close)
  $form.addEventListener('submit', submit)
  $taskEditModal.showModal()
}

function handleRemoveTask(todo) {
  const $closeModal = $taskDeleteModal.querySelector('.close-modal')
  const $taskText = $taskDeleteModal.querySelector('.task-text')
  const $yes = $taskDeleteModal.querySelector('.delete-yes')
  const $no = $taskDeleteModal.querySelector('.delete-no')

  $taskText.innerText = todo.text

  function close() {
    $taskDeleteModal.close()
    $closeModal.removeEventListener('click', close)
    $no.removeEventListener('click', close)
    $yes.removeEventListener('click', removeTask)
  }

  function removeTask() {
    remove(todo)
    showTasks()
    $taskDeleteModal.close()
    $closeModal.removeEventListener('click', close)
    $no.removeEventListener('click', close)
    $yes.removeEventListener('click', removeTask)
  }

  $closeModal.addEventListener('click', close)
  $no.addEventListener('click', close)
  $yes.addEventListener('click', removeTask)

  $taskDeleteModal.showModal()
  $yes.focus()
}

function showTasks() {
  $todos.innerHTML = ''

  todos.sort((a, b) => {
    if (a.done && !b.done) return 1
    if (!a.done && b.done) return -1
    return new Date(b.date) - new Date(a.date)
  })

  for (const todo of todos) {
    const $element = document.createElement('li')
    $element.classList.add('flex', 'items-center', 'gap-4', 'bg-sky-100', 'odd:bg-sky-200', 'py-2', 'px-4')
    $element.innerHTML = `
      <input type="checkbox" class="done size-4" ${todo.done ? 'checked' : ''} />
      <div class="flex-1 text-sky-700 truncate ${todo.done ? 'line-through' : ''}">
        <div class="text-sky-700 truncate font-medium">${todo.text}</div>
        <div class="text-xs flex gap-4">
          <span><i class="fa-regular fa-calendar"></i> <b>Data:</b> ${new Date(todo.date).toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
          })}</span>
          <span><i class="fa-regular fa-clock"></i> <b>Início:</b> ${todo.start}</span>
          <span><i class="fa-regular fa-clock"></i> <b>Fim:</b> ${todo.end}</span>
        </div>
      </div>
      <button
        class="edit px-1 rounded-full text-sky-400 hover:text-sky-500 active:text-sky-600 focus:outline-none focus-visible:ring-4 transition-all"
      >
        <i class="fa-solid fa-pencil"></i>
      </button>
      <button
        class="remove px-1 rounded-full text-sky-400 hover:text-sky-500 active:text-sky-600 focus:outline-none focus-visible:ring-4 transition-all"
      >
        <i class="fa-solid fa-trash-can"></i>
      </button>
    `

    const $done = $element.querySelector('.done')
    const $edit = $element.querySelector('.edit')
    const $remove = $element.querySelector('.remove')
    $done.addEventListener('change', (e) => handleTaskDone(todo, e.target.checked))
    $edit.addEventListener('click', () => handleEditTask(todo))
    $remove.addEventListener('click', () => handleRemoveTask(todo))

    $todos.appendChild($element)
  }
}

showTasks()
