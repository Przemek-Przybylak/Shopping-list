{
    const tasks = []

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    }

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
    }

    const render = () => {
        let htmlString = "";
        
        for (const task of tasks) {
            htmlString += `
            <li  class="section__item ${task.done ? "section__item--strikeout " : ""}"> 
            <button class="section__image section__image--green ${task.done ? "section__itemDone" : ""} js-taskDone"></button>
            ${task.content}
            <button class="section__image section__image--red js-remove"></button> 
            </li>
            `;
        
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        
        if (newTaskContent === ""){
            return;
        }

     addNewTask(newTaskContent);
     
    };

    const init = () => {
        

        const form = addEventListener("submit", onFormSubmit);

    };

    init();
}