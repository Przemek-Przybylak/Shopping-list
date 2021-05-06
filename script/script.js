{
    const tasks = [
        {
            content: "Stworzyć listę zakupów",
            done: false,
        },
        {
            content: "Nauczyć sie 5 nowych zwrotów z języka angielskiego",
            done: true,
        },
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

    const init = () => {
        render();


    };

    init();
}