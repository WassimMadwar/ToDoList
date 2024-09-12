
let txtEv = document.querySelector(".input_Fild");
let AddEv = document.querySelector(".btn_Add");
let CheckList = document.querySelector(".tasksList");
let tasksList = [];
AddEv.style.backgroundColor=window.localStorage.getItem("color");


// check if there is data in local storage "CheckList" = tasks
if (window.localStorage.getItem("CheckList")) {
    // copy the data from local storage to tasksList 
    tasksList = JSON.parse(window.localStorage.getItem("CheckList"));
}



// trager 
GetDataFromLocalStorage();


// check not empty
AddEv.onclick = function () {
    if (txtEv.value !=="") {
        AddTaskToArray(txtEv.value);
        txtEv.value = ""; //claer input field
    }
};


//Delete item
CheckList.addEventListener("click",(e)=>{
    if (e.target.classList.contains("btn_Delete")) {
        DeleteTaskBy(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        ToggelStatusTaskBy(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");
    }
});



function AddTaskToArray(newTask) {
    // task data
    const task = {
        id : Date.now(),//it will be as id and date for the task
        title : newTask,
        completed : false,
    };
    //push task to array 
    tasksList.push(task);
    // add task to page
    AddTaskToPageFrom(tasksList);
    // add details to local Storage
    AddDataToLocalStorageFrom(tasksList)
}


function AddTaskToPageFrom(tasksList) {
    // 1. empty the CheckList
    CheckList.innerHTML ="";
    // 2. looping on array of tasks
    tasksList.forEach((task)=>{
        //create new div task
        let Ndiv = document.createElement("div");
        Ndiv.className = "task";
        // check if task is done
        if (task.completed) {
            Ndiv.className = "task done ";
        }
        Ndiv.setAttribute("data-id",task.id);
        Ndiv.appendChild(document.createTextNode(task.title));
        //create delete button
        let btn_Delete = document.createElement("span");
        btn_Delete.className = "btn_Delete";
        btn_Delete.style.backgroundColor = window.localStorage.getItem("color");
        btn_Delete.appendChild(document.createTextNode("Delete Task"));
        Ndiv.appendChild(btn_Delete);
        CheckList.appendChild(Ndiv);
        
    });
};


function AddDataToLocalStorageFrom(tasksList) {
    window.localStorage.setItem("CheckList",JSON.stringify(tasksList));
};

function GetDataFromLocalStorage() {
    let data = window.localStorage.getItem("CheckList")
    if(data){
        let tasks = JSON.parse(data);
        AddTaskToPageFrom(tasks);
    }
};


function DeleteTaskBy(taskID) {
    tasksList = tasksList.filter((task)=> task.id != taskID);
    AddDataToLocalStorageFrom(tasksList);
}


function ToggelStatusTaskBy(taskID) {
    for (let i = 0; i < tasksList.length; i++) {
        if (tasksList[i].id == taskID) {  
            tasksList[i].completed == false ? tasksList[i].completed = true : tasksList[i].completed = false;
        }
    }
    AddDataToLocalStorageFrom(tasksList);
}