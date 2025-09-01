document.addEventListener("DOMContentLoaded", function () {
    var hamburgerBtn = document.querySelector(".hamburger");
    var navList = document.querySelector(".nav-list");
    hamburgerBtn.addEventListener("click", function () {
        navList.classList.toggle("active");
    });
});

let contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", function () {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    if (name === "" || email === "") {
        alert("Please fill out all fields");
    } else {
        alert("Form submitted!");
    }
});

let tasks = [];

function saveTasks() 
{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() 
{
    const stored = localStorage.getItem("tasks");
    if (stored) 
    {
        tasks = JSON.parse(stored);
        renderTasks();
    }
}

function addTask() 
{
    const input = document.getElementById("taskInput");
    const newTask = input.value.trim();
    if (newTask !== "") 
    {
        tasks.push({ text: newTask, done: false });
        input.value = "";
        saveTasks();
        renderTasks();
    }
}

function renderTasks(listToRender = tasks) 
{
    const list = document.getElementById("taskList");
    list.innerHTML = "";
    for (let i = 0; i < listToRender.length; i++) {
        const li = document.createElement("li");
        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = listToRender[i].done;
        checkbox.onchange = function () {
            let realIndex = tasks.indexOf(listToRender[i]);
            tasks[realIndex].done = checkbox.checked;
            saveTasks();
            renderTasks();
        };
        li.appendChild(checkbox);
        // Task text
        const taskText = document.createElement("span");
        taskText.textContent = " " + listToRender[i].text;
        li.appendChild(taskText);
        // Delete button
        const delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.onclick = function () {
            let realIndex = tasks.indexOf(listToRender[i]);
            deleteTask(realIndex);
        };
        li.appendChild(delBtn);
        list.appendChild(li);
    }
}

// Delete a task
function deleteTask(index) 
{
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Hook up buttons
document.getElementById("addBtn").addEventListener("click", addTask);
document.getElementById("filterBtn").addEventListener("click", function () {
    const incomplete = tasks.filter(t => !t.done);
    renderTasks(incomplete);
});
document.getElementById("showAllBtn").addEventListener("click", function () {
    renderTasks();
});

// Load tasks on page start
loadTasks();
