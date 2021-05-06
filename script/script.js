{
    const tasks = [
        
    ]

    const render = () => {
        let htmlString = "";
        

        for (const task of tasks) {
            htmlString += `
            <li  class="section__item ${task.done ? "section__itemDone" : ""}"> 
            <button class="section__image section__image--green"></button>
            ${task.content}
            <button class="section__image section__image--red"></button> 
            </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });
        render();
    }

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