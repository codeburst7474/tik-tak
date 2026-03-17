const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const editModal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const saveEditBtn = document.getElementById('saveEditBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

let currentEditId = null;

// READ: Fetch all tasks
async function fetchTasks() {
    try {
        const response = await fetch('/api/getdata');
        const data = await response.json();
        renderTasks(data);
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

// CREATE: Add a new task
async function addTask() {
    const text = taskInput.value.trim();
    console.log('Attempting to add task:', text);
    if (!text) {
        console.warn('Task input is empty');
        return;
    }

    try {
        console.log('Sending POST request to /api/createinput');
        const response = await fetch('/api/createinput', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: text })
        });
        
        console.log('Response received:', response.status);
        if (response.ok) {
            const result = await response.json();
            console.log('Task added successfully:', result);
            taskInput.value = '';
            fetchTasks();
        } else {
            const error = await response.json();
            console.error('Failed to add task:', error);
            alert('Failed to add task: ' + (error.error || 'Unknown error'));
        }
    } catch (error) {
        console.error('Network or Server error:', error);
        alert('Could not connect to the server. Is it running?');
    }
}

// DELETE: Remove a task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const response = await fetch(`/api/delete/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// UPDATE: Save changes to a task
async function saveEdit() {
    const text = editInput.value.trim();
    if (!text || !currentEditId) return;

    try {
        const response = await fetch(`/api/update/${currentEditId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: text })
        });
        
        if (response.ok) {
            closeModal();
            fetchTasks();
        }
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

// UI Rendering
function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <div class="task-content">${task.data}</div>
            <div class="task-actions">
                <button class="btn-edit" onclick="openEditModal('${task._id}', '${task.data}')">Edit</button>
                <button class="btn-delete" onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function openEditModal(id, text) {
    currentEditId = id;
    editInput.value = text;
    editModal.style.display = 'flex';
}

function closeModal() {
    editModal.style.display = 'none';
    currentEditId = null;
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
saveEditBtn.addEventListener('click', saveEdit);
closeModalBtn.addEventListener('click', closeModal);

// Initial Load
fetchTasks();
