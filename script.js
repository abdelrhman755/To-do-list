let tasks = [];

const addtask = ()=>{
    const taskinput = document.getElementById('taskinput');
    const text = taskinput.value.trim()
    if (text) {
        tasks.push({text:text, completed: false });
        taskinput.value = '';
        updatetaskslist();
        updatestats();
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updatetaskslist();
    updatestats();
}


const editTask = (index) => {
    const taskInput = document.getElementById('taskinput'); 
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updatetaskslist();
    updatestats();
}


const updatestats = () => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;
};

const togglemissonkcomplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updatetaskslist();
    updatestats();
}

const updatetaskslist = () => {
    const tasklist = document.getElementById('task-list');
    tasklist.innerHTML = '';
    tasks.forEach((task, index) => {
        const listitem = document.createElement('li');
        listitem.innerHTML =`
        <div class="taskitem">
            <div class="task ${task.completed ? 'completed':''}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? 'checked' :""
                }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <i class="fa-solid fa-pen" onclick="editTask(${index})"></i>
                <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
            </div>
        </div>
        `;

        tasklist.append(listitem);
        listitem.addEventListener('change', () => togglemissonkcomplete(index) );
    })
}

document.getElementById('newtask').addEventListener('click', function(e){
    e.preventDefault();
    addtask();
});