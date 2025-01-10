// const button = document.getElementById("send");
// const btn = document.getElementById("daynight");
// const input = document.getElementById("input");
// const taskList = document.getElementById("taskList");
// const body = document.querySelector("body")


// btn.addEventListener("click", () => {
//     if(document.body.classList.toggle("dark-mode")){
//         btn.textContent = '☀️';
//     }else{
//         btn.textContent = '🌙';
//     }
// });


// button.addEventListener("click", ()=>{
//    const taskText = input.input.trim();
//    if(taskText === ""){
//     alert('Please enter a task')
//     return
//    }
   
//     const li = document.createElement("li");
    
//     li.textContent = input.value;
//     li.className = "li-element";

//     taskList.appendChild(li);

//     const editBtn = document.createElement('button');
//     editBtn.textContent = '🖊'
//     taskList.appendChild(editBtn);
    
//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = '🪣';
//     taskList.appendChild(deleteBtn);

//     deleteBtn.addEventListener("click", ()=>{
//         taskList.removeChild(li)
//         taskList.removeChild(deleteBtn)
//         taskList.removeChild(editBtn)
//     })
//    input.input = '';
// });
const button = document.getElementById("send");
const btn = document.getElementById("daynight");
const input = document.getElementById("input");
const taskList = document.getElementById("taskList");
const body = document.querySelector("body");

btn.addEventListener("click", () => {
    if(document.body.classList.toggle("dark-mode")){
        btn.textContent = '☀️';
    }else{
        btn.textContent = '🌙';
    }
});


window.onload = () => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
        storedTasks.forEach(task => {
            addTaskToDOM(task.text);
        });
    }
};

button.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText === "") {
        alert('Пожалуйста введите задачу');
        return;
    }

    addTaskToDOM(taskText);

    // Save task to local storage
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.push({ text: taskText });
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    input.value = '';
});

// Function to add task to the DOM
function addTaskToDOM(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;
    li.className = "li-element";
    taskList.appendChild(li);

    const editBtn = document.createElement('button');
    editBtn.textContent = '🖊';
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🪣';
    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
    });

    editBtn.addEventListener("click", () => {
        input.value = taskText;
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
    });
}

// Function to remove task from local storage
function removeTaskFromLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
