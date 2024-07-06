let data = [
  {
    name: "Todo A",
    completed: false,
  },
  {
    name: "Todo B",
    completed: false,
  },
  {
    name: "Todo C",
    completed: false,
  },
  {
    name: "Todo D",
    completed: false,
  },
];

const submitButton = document.querySelector(".submit");
const todoContainer = document.getElementById("list-container");

let update = null;

// Toggles the todo completed status to true or false
function toggleCompleted(todo, index) {
  const status = todo.completed;

  if (status === true) {
    todo.completed = false;
  } else {
    todo.completed = true;
  }

  data[index] = todo;
  renderTodoes();
}

function addTodo() {
  const input = document.getElementById("input-box");
  const value = input.value;

  if (value.length < 1) return;

  if (update) {
    const [todo, index] = update;
    const updatedTodo = {
      name: value,
      completed: todo.completed,
    };
    data[index] = updatedTodo;
    update = null;
  } else {
    const newTodo = {
      name: value,
      completed: false,
    };
    data.push(newTodo);
  }

  renderTodoes();
  input.value = "";
  submitButton.innerHTML = "Add";
  submitButton.classList.remove("update-color");
}

function deleteTodo(index) {
  data = data.reduce((acc, cur, idx) => {
    if (idx != index) acc.push(cur);
    return acc;
  }, []);
  renderTodoes();
}

function initializeUpdate(data, index) {
  update = [data, index];
  const input = document.getElementById("input-box");
  input.value = data.name;
  submitButton.innerHTML = "Update";
  submitButton.classList.add("update-color");
}

function renderTodoes(_data) {
  todoContainer.innerHTML = "";
  const iterator = _data || data;

  for (let index = 0; index < iterator.length; index++) {
    const todo = iterator[index];

    let li = document.createElement("li");
    li.textContent = todo.name;
    li.onclick = () => toggleCompleted(todo, index);

    let div = document.createElement("div");
    div.innerHTML = `
    <div class="actions">
      <button class="edit">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"     xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
      </svg>
      </button>

      <button class="delete">
      <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
      </svg>
      </button>
    </div>
    `;
    li.appendChild(div);

    const editBtn = li.querySelector(".actions .edit");
    const deleteBtn = li.querySelector(".actions .delete");
    editBtn.onclick = (event) => {
      event.stopPropagation();
      event.preventDefault();
      initializeUpdate(todo, index);
    };
    deleteBtn.onclick = (event) => {
      event.stopPropagation();
      event.preventDefault();
      deleteTodo(index);
    };

    if (todo.completed) {
      li.classList.add("checked");
    }

    todoContainer.appendChild(li);
  }
}

function performSearch(input) {
  const value = input.value.toLowerCase();
  const filteredData = data.filter((todo) =>
    todo.name.toLowerCase().includes(value)
  );
  renderTodoes(filteredData);
}
renderTodoes();
