{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice( 0, taskIndex),
            ...tasks.slice( taskIndex +1),
        ]
        render();
    };

    const resetInput = (newTask) => {
        newTask.value = "";
        activeInput(newTask);
    };

    const activeInput = (newTask) => {
        newTask.focus();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            { ...tasks[taskIndex], 
                done: !tasks[taskIndex].done },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-taskDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li  class="section__item ${task.done ? "section__item--strikeout " : ""}"> 
            <button class="section__imageButton section__imageButton--green ${task.done ? "section__itemDone" : ""} js-taskDone"></button>
            <span class="section__task">${task.content}</span>
            <button class="section__imageButton section__imageButton--red js-remove"></button> 
            </li>
            `;

        };
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        const newTask = document.querySelector(".js-newTask");

        if (newTaskContent === "") {
            resetInput(newTask);
            return;
        };

        addNewTask(newTaskContent);
        resetInput(newTask);
    };

    const init = () => {

        form = document.querySelector(".js-form");
        form = addEventListener("submit", onFormSubmit);

    };

    init();
}