/* eslint-disable indent */

let projectList = []
const projectButton = document.querySelector('#cProject')
const taskButton = document.querySelector('#cTask')
let chosenP
if (localStorage.getItem('storedList')) {
  getFromStorage()
} else {
  cProject('hi', 'doods')
  chosenP = projectList[0]
  const today = new Date()

  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  cTask('do it', 'just do it', date, 'Low')
  initiate()
}

function Project (name, description) {
  this.name = name
  this.description = description

  this.tasks = []
}

function Task (title, description, duedate, priority) {
  this.title = title
  this.description = description
  this.duedate = duedate
  this.priority = priority
}

function cProject (name, description) {
  const project = new Project(name, description)
  projectList.push(project)
  initiate()
}

chosenP = projectList[0]

function chooseProject (e) {
  chosenP = projectList[e.target.id]

  return chosenP
}

function cTask (title, description, duedate, priority) {
  const task = new Task(title, description, duedate, priority)
  chosenP.tasks.push(task)
  initiate()
}

let chosenT = chosenP.tasks[0]

function chooseTask (e) {
  chosenT = chosenP.tasks[e.target.id]

  return chosenT
}

function deleteproj () {
  const index = projectList.indexOf(chosenP)

  if (index > -1) {
    projectList.splice(index, 1)
  }
  initiate()
}

function deleteTask () {
  const index = chosenP.tasks.indexOf(chosenT)

  if (index > -1) {
    chosenP.tasks.splice(index, 1)
  }
  console.log(chosenP.tasks)
  initiate()
}

function expandTask (task, box, plus, number) {
  if (plus.textContent === '+') {
    const descriptionDiv = document.createElement('div')
    const description = document.createElement('p')
    descriptionDiv.classList.add('description')
    description.textContent = task.description
    box.appendChild(descriptionDiv)
    descriptionDiv.appendChild(description)
    descriptionDiv.setAttribute('id', number)
    description.setAttribute('id', number)
    plus.textContent = '-'
  } else if (plus.textContent === '-') {
    renderTasks()
  }
}

function renderTasks () {
  const taskArea = document.querySelector('#tasks')
  taskArea.textContent = ''

  let number = 0
  chosenP.tasks.forEach((task) => {
    const box = document.createElement('div')
    box.classList.add('task')

    taskArea.appendChild(box)
    box.setAttribute('id', number)
    box.addEventListener('click', (e) => {
      chooseTask(e)
    })

    for (let i = 0; i <= 4; i++) {
      if (i === 0) {
        const title = document.createElement('h1')
        title.textContent = task.title
        box.appendChild(title)
        title.classList.add('name')
        title.setAttribute('id', number)
      } else if (i === 1) {
        const date = document.createElement('p')
        date.textContent = task.duedate
        box.appendChild(date)
        date.setAttribute('id', number)
      } else if (i === 2) {
        const priority = document.createElement('p')
        priority.textContent = task.priority
        box.appendChild(priority)
        priority.setAttribute('id', number)
      } else if (i === 3) {
        const deleteBtn = document.createElement('p')
        deleteBtn.textContent = 'Delete'
        box.appendChild(deleteBtn)
        deleteBtn.setAttribute('id', number)
        deleteBtn.addEventListener('click', (e) => {
          chooseTask(e)
          deleteTask()
          renderTasks()
        })
      } else if (i === 4) {
        const plus = document.createElement('p')
        plus.textContent = '+'
        box.appendChild(plus)
        plus.setAttribute('id', number)
        plus.addEventListener('click', () => {
          expandTask(task, box, plus, number)
        })
      }
    }
    number++
  })
}

function renderProject () {
  const sidebar = document.querySelector('#projects')
  sidebar.textContent = ''
  let number = 0
  projectList.forEach((project) => {
    const box = document.createElement('div')

    box.classList.add('project')

    sidebar.appendChild(box)

    box.setAttribute('id', number)

    box.addEventListener('click', (e) => {
      chooseProject(e)
      renderTasks()
    })

    const deleteBtn = document.createElement('p')
    deleteBtn.textContent = 'delete'
    deleteBtn.classList.add('deleteBtn')

    for (const key in project) {
      if (key === 'name') {
        const name = document.createElement('h2')
        name.textContent = project[key]
        box.appendChild(name)
        name.setAttribute('id', number)
      }
      if (key === 'description') {
        const description = document.createElement('p')
        description.textContent = project[key]
        box.appendChild(description)
        description.setAttribute('id', number)
      }
    }

    box.appendChild(deleteBtn)
    deleteBtn.setAttribute('id', number)

    deleteBtn.addEventListener('click', (e) => {
      chooseProject(e)
      deleteproj(e)
      renderProject()
    })
    number += 1
  })
}

function renderTForm () {
  const formDiv = document.querySelector('#forms')
  
  const form = document.createElement('form')
  const nameDiv = document.createElement('div')
  const dateDiv = document.createElement('div')
  const priorityDiv = document.createElement('div')
  const buttonDiv = document.createElement('div')
  const nameLabel = document.createElement('label')
  const dateLabel = document.createElement('label')
  const priorityLabel = document.createElement('label')
  const nameInput = document.createElement('input')
  const dateInput = document.createElement('input')
  const prioritySelect = document.createElement('select')
  const lowOption = document.createElement('option')
  const mediumOption = document.createElement('option')
  const highOption = document.createElement('option')
  const descriptionArea = document.createElement('textarea')
  const createBtn = document.createElement('button')
  const cancelBtn = document.createElement('button')

  nameLabel.htmlFor = 'tName'
  dateLabel.htmlFor = 'tDate'
  priorityLabel.htmlFor = 'priority'

  priorityLabel.textContent = 'Priority:'
  nameLabel.textContent = 'Name:'
  dateLabel.textContent = 'Date:'

  nameInput.name = 'tName'
  dateInput.name = 'tDate'
  prioritySelect.name = 'priority'
  descriptionArea.name = 'tDescription'

  descriptionArea.placeholder = 'Description'

  nameInput.classList.add('text')
  dateInput.classList.add('text')
  buttonDiv.classList.add('buttons')

  lowOption.value = 'low'
  mediumOption.value = 'medium'
  highOption.value = 'high'

  lowOption.textContent = 'Low'
  mediumOption.textContent = 'Medium'
  highOption.textContent = 'High'

  createBtn.type = 'button'
  cancelBtn.type = 'button'
  dateInput.type = 'date'

  createBtn.textContent = 'Create'
  cancelBtn.textContent = 'Cancel'

  prioritySelect.add(lowOption)
  prioritySelect.add(mediumOption)
  prioritySelect.add(highOption)

  formDiv.appendChild(form)
  form.appendChild(nameDiv)
  form.appendChild(dateDiv)
  form.appendChild(priorityDiv)
  form.appendChild(descriptionArea)
  form.appendChild(buttonDiv)

  nameDiv.appendChild(nameLabel)
  nameDiv.appendChild(nameInput)

  dateDiv.appendChild(dateLabel)
  dateDiv.appendChild(dateInput)

  priorityDiv.appendChild(priorityLabel)
  priorityDiv.appendChild(prioritySelect)

  buttonDiv.appendChild(createBtn)
  buttonDiv.appendChild(cancelBtn)

  form.setAttribute('id', 'taskform')
  nameInput.setAttribute('id', 'tName')
  dateInput.setAttribute('id', 'tDate')
  prioritySelect.setAttribute('id', 'priority')
  descriptionArea.setAttribute('id', 'tDescription')

  createBtn.addEventListener('click', () => {
    cTask(nameInput.value, descriptionArea.value, dateInput.value, prioritySelect.value)
    formDiv.textContent = ''
    renderTasks()
    initiate()
  })
  cancelBtn.addEventListener('click', () => {
    formDiv.textContent = ''
  })
}

function renderPForm () {
  const formDiv = document.querySelector('#forms')
  const form = document.createElement('form')
  const nameDiv = document.createElement('div')
  const nameLabel = document.createElement('label')
  const nameInput = document.createElement('input')
  const descriptionArea = document.createElement('textarea')
  const buttonDiv = document.createElement('div')
  const createBtn = document.createElement('button')
  const cancelBtn = document.createElement('button')

  nameInput.classList.add('text')
  buttonDiv.classList.add('buttons')

  nameLabel.htmlFor = 'pName'

  nameLabel.textContent = 'Name:'
  descriptionArea.placeholder = 'Description'

  descriptionArea.name = 'pDescription'
  nameInput.name = 'pName'

  nameInput.required = true
  descriptionArea.required = true

  createBtn.type = 'button'
  cancelBtn.type = 'button'

  createBtn.textContent = 'Create'
  cancelBtn.textContent = 'Cancel'

  formDiv.appendChild(form)
  form.appendChild(nameDiv)
  form.appendChild(descriptionArea)
  form.appendChild(buttonDiv)

  nameDiv.appendChild(nameLabel)
  nameDiv.appendChild(nameInput)

  buttonDiv.appendChild(createBtn)
  buttonDiv.appendChild(cancelBtn)

  form.setAttribute('id', 'projectForm')
  nameInput.setAttribute('id', 'pName')

  descriptionArea.setAttribute('id', 'pDescription')

  createBtn.addEventListener('click', () => {
    cProject(nameInput.value, descriptionArea.value)
    formDiv.textContent = ''
    renderProject()
    initiate()
  })
  cancelBtn.addEventListener('click', () => {
    formDiv.textContent = ''
  })
}

projectButton.addEventListener('click', () => {
  renderPForm()
})
taskButton.addEventListener('click', () => {
  if (projectList.length > 0) {
    renderTForm()
  }
})

function initiate () {
  localStorage.clear()

  localStorage.setItem('storedList', JSON.stringify(projectList))

  getFromStorage()
}

function getFromStorage () {
  projectList = []
  const stored = JSON.parse(localStorage.getItem('storedList'))
  projectList = stored
  renderProject()
}

renderProject()
