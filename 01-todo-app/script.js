const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';

  const filtered = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  filtered.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}" />
      <span>${todo.text}</span>
      <button class="edit-btn" data-id="${todo.id}">Edit</button>
      <button class="delete-btn" data-id="${todo.id}">Delete</button>
    `;
    list.appendChild(li);
  });

  const activeCount = todos.filter(t => !t.completed).length;
  itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: Date.now(),
    text,
    completed: false
  });

  input.value = '';
  saveTodos();
  renderTodos();
});

list.addEventListener('click', e => {
  const id = Number(e.target.dataset.id);
  if (!id) return;

  if (e.target.type === 'checkbox') {
    const todo = todos.find(t => t.id === id);
    todo.completed = e.target.checked;
    saveTodos();
    renderTodos();
  }

  if (e.target.classList.contains('delete-btn')) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
  }

  if (e.target.classList.contains('edit-btn')) {
    const todo = todos.find(t => t.id === id);
    const newText = prompt('Edit task:', todo.text);
    if (newText !== null && newText.trim()) {
      todo.text = newText.trim();
      saveTodos();
      renderTodos();
    }
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  saveTodos();
  renderTodos();
});

renderTodos();