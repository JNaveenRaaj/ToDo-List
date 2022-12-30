// importing all required elements
const inputbox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todolist = document.querySelector(".todolist");
const clearall = document.querySelector(".footer button");

inputbox.onkeyup = () => {
    let userdata = inputbox.value; //getting user data
    if (userdata.trim() != 0) { //if user value aren't only space
        addBtn.classList.add("active");
    }
    else {
        addBtn.classList.remove("active");
    }
}


showtasks();
// when addbtn is clicked 
addBtn.onclick = () => {
    let userdata = inputbox.value;
    let getlocalstorage = localStorage.getItem("New todo");
    if (getlocalstorage === null) {
        listArr = []; //creating an empty array
    }
    else {
        listArr = JSON.parse(getlocalstorage); //coverting json object into js string
    }
    listArr.push(userdata);
    localStorage.setItem("New todo", JSON.stringify(listArr)); //coverting js object into json object
    showtasks(); //calling the function
}
inputbox.addEventListener("keyup", function (event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        let userdata = inputbox.value;
        let getlocalstorage = localStorage.getItem("New todo");
        if (getlocalstorage == null) {
            listArr = []; //creating an empty array
        }
        else {
            listArr = JSON.parse(getlocalstorage); //coverting json object into js string
        }
        let newlitag = ''; //creating empty innerhtml

        listArr.forEach((element, index) => {
            newlitag += `<li>${element} <span onclick = "deletetask(${index})"; ><i class="fas fa-trash"></i></span></li>` //adding innerhtml after user clicks the addbtn
        });
        listArr.push(userdata);
        localStorage.setItem("New todo", JSON.stringify(listArr)); //coverting js object into json object
        showtasks();
    }
})
// adding list 
function showtasks() {
    let getlocalstorage = localStorage.getItem("New todo");
    if (getlocalstorage == null) {
        listArr = []; //creating an empty array
    }
    else {
        listArr = JSON.parse(getlocalstorage); //coverting json object into js string
    }
    //showing no of pending tasks
    const pending = document.querySelector(".pending");
    pending.textContent = listArr.length;
    if (listArr.length > 0) {
        clearall.classList.add("active");
    }
    else {
        clearall.classList.remove("active");
    }

    //updating list
    let newlitag = ''; //creating empty innerhtml

    listArr.forEach((element, index) => {
        newlitag += `<li>${element} <span onclick = "deletetask(${index})"; ><i class="fas fa-trash"></i></span></li>` //adding innerhtml after user clicks the addbtn
    });
    todolist.innerHTML = newlitag;
    inputbox.value = '';// once task is added leave the input box blank
    addBtn.classList.remove("active");
}


//deleting the task when the button is pressed
function deletetask(index) {
    let getlocalstorage = localStorage.getItem("New todo");
    listArr = JSON.parse(getlocalstorage);
    listArr.splice(index, 1);// adds and element when its 0 and replaces the element when it is set to 1

    //after removing the element we will update the local storage
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showtasks();
}

clearall.addEventListener("click", () => {
    listArr = [];
    localStorage.setItem("New todo", JSON.stringify(listArr));
    showtasks();

})