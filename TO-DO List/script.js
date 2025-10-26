
const taskInput = document.querySelector('#taskInput')
const addBtn = document.querySelector('#addBtn')
const output = document.querySelector('#output')

addBtn.addEventListener("click", function () {

    const text = taskInput.value.trim();

    if (text !== "") {

        const newDiv = document.createElement("div");

        newDiv.classList.add("border")
        newDiv.classList.add("border-gray-400")
        newDiv.classList.add("px-3")
        newDiv.classList.add("py-2")
        newDiv.classList.add("rounded-lg")
        

        newDiv.textContent = text;

        output.appendChild(newDiv);



    } 
})
