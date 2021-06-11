{
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false }
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
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
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done
            },
            ...tasks.slice(taskIndex + 1),
        ]
        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTask = !hideDoneTask;

        render();
    };

    const doneAllTasks = () => {
        if (tasks.map(task => !task.done)) {
            tasks.forEach((task, index) => {
                tasks[index] = { ...task, done: true };
            });
        };
        render();
    };




    const bindRemoveEvents = () => {
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



    const bindButtonsEvent = () => {
        const buttonHidingDone = document.querySelector(".js-hidingDone");
        if (buttonHidingDone) {
            buttonHidingDone.addEventListener("click", toggleHideDoneTask);
        };

        const doneAll = document.querySelector(".js-doneAll");
        doneAll.addEventListener("click", doneAllTasks);
    };

    const renderTaks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li  class="section__item ${hideDoneTask && task.done ? "button--hidden " : ""}"> 
            <button class="section__imageButton section__imageButton--green js-taskDone 
            ${task.done ? "section__itemDone" : ""}"></button>
            <span class="section__task js-taskContent 
            ${task.done ? "section__item--strikeout" : ""} ">${task.content}</span>
            <button class="section__imageButton section__imageButton--red js-remove"></button> 
            </li>
            `;

        };
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlButtons = "";
        const buttons = document.querySelector(".js-buttons");
        htmlButtons += `
        <button class = "button__item button__item--hidingDone js-hidingDone ${!tasks.length ? "button--hidden" : ""} ">
        ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone</button>
        <button class = "button__item button__item--doneAll js-doneAll ${!tasks.length ? "button--hidden" : ""}" 
        ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>`
            ;

        buttons.innerHTML = htmlButtons;
    };

    const render = () => {
        renderTaks();
        renderButtons();

        bindRemoveEvents();
        bindButtonsEvent();
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