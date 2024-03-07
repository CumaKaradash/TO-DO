
var tasks = [];

function addTask() {
    var taskInput = document.getElementById("task-input");
    var prioritySelect = document.getElementById("priority");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    var task = {
        id: Date.now(),
        text: taskInput.value,
        priority: prioritySelect.value,
        completed: false
    };

    tasks.push(task);

    renderTasks();
    taskInput.value = "";
}

function renderTasks() {
    var taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        var li = document.createElement("li");
        li.innerHTML = '<input type="text" value="' + task.text + '" onblur="updateTask(this)" />' +
                        '<span onclick="toggleTask(' + task.id + ')">' + task.text + '</span>' +
                        '<span class="priority">' + task.priority + '</span>' +
                        '<div class="buttons">' +
                        '<button onclick="editTask(' + task.id + ')">Edit</button>' +
                        '<button onclick="completeTask(' + task.id + ')">Complete</button>' +
                        '<button onclick="removeTask(' + task.id + ')">Remove</button>' +
                        '</div>';
        if (task.completed) {
            li.classList.add("completed");
        }

        taskList.appendChild(li);
    });

    filterTasks();
}

function toggleTask(id) {
    var task = tasks.find(function(task) {
        return task.id === id;
    });

    task.completed = !task.completed;
    renderTasks();
}

function editTask(id) {
    var task = tasks.find(function(task) {
        return task.id === id;
    });

    var li = document.querySelector('li[data-id="' + id + '"]');
    var span = li.querySelector('span');
    var input = li.querySelector('input[type="text"]');

    span.style.display = "none";
    input.style.display = "inline-block";
    input.value = task.text;
    input.focus();
}

function updateTask(input) {
    var id = parseInt(input.parentNode.getAttribute("data-id"));
    var task = tasks.find(function(task) {
        return task.id === id;
    });

    task.text = input.value;
    renderTasks();
}

function completeTask(id) {
    var task = tasks.find(function(task) {
        return task.id === id;
    });

    task.completed = !task.completed;
    renderTasks();
}

function removeTask(id) {
    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    renderTasks();
}

function filterTasks() {
    var filter = document.getElementById("filter").value;
    var taskList = document.getElementById("task-list");
    var filteredTasks = [];

    switch (filter) {
        case "active":
            filteredTasks = tasks.filter(function(task) {
                return !task.completed;
            });
            break;
        case "completed":
            filteredTasks = tasks.filter(function(task) {
                return task.completed;
            });
            break;
        default:
            filteredTasks = tasks;
    }

    taskList.innerHTML = "";

    filteredTasks.forEach(function(task) {
        var li = document.createElement("li");
        li.innerHTML = '<input type="text" value="' + task.text + '" onblur="updateTask(this)" />' +
                        '<span onclick="toggleTask(' + task.id + ')">' + task.text + '</span>' +
                        '<span class="priority">' + task.priority + '</span>' +
                        '<div class="buttons">' +
                        '<button onclick="editTask(' + task.id + ')">Edit</button>' +
                        '<button onclick="completeTask(' + task.id + ')">Complete</button>' +
                        '<button onclick="removeTask(' + task.id + ')">Remove</button>' +
                        '</div>';
        if (task.completed) {
            li.classList.add("completed");
        }

        taskList.appendChild(li);
    });
}

function searchTasks() {
    var searchInput = document.getElementById("search");
    var keyword = searchInput.value.toLowerCase();

    var filteredTasks = tasks.filter(function(task) {
        return task.text.toLowerCase().includes(keyword);
    });

    var taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    filteredTasks.forEach(function(task) {
        var li = document.createElement("li");
        li.innerHTML = '<input type="text" value="' + task.text + '" onblur="updateTask(this)" />' +
                        '<span onclick="toggleTask(' + task.id + ')">' + task.text + '</span>' +
                        '<span class="priority">' + task.priority + '</span>' +
                        '<div class="buttons">' +
                        '<button onclick="editTask(' + task.id + ')">Edit</button>' +
                        '<button onclick="completeTask(' + task.id + ')">Complete</button>' +
                        '<button onclick="removeTask(' + task.id + ')">Remove</button>' +
                        '</div>';
        if (task.completed) {
            li.classList.add("completed");
        }

        taskList.appendChild(li);
    });
}