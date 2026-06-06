let tasks = [];

const addtask = ()=>{
    const taskinput = document.getElementById('taskinput');
    const text = taskinput.value.trim()
    if (text) {
        tasks.push({text:text, completed: false });
        taskinput.value = '';
        updatetaskslist()
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updatetaskslist();
}


const editTask = (index) => {
    const taskInput = document.getElementById('taskinput');
    taskinput.value = tasks[index].text;
    tasks.splice(index, 1);
    updatetaskslist();
}

const togglemissonkcomplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updatetaskslist();
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
        listitem.addEventListener('change', () => togglemissonkcomplete(index) )
    })
}

document.getElementById('newtask').addEventListener('click', function(e){
    e.preventDefault();
    addtask();
});