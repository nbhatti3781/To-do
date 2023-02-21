let name = localStorage.getItem("nametag");
console.log(name);


let namePerson = document.querySelector("#namePerson")

namePerson.innerHTML = name;
let tasks = [];
if (localStorage.getItem("tasks") === null) {
  tasks = [
    {
      name: "Steal bananas from the store." ,
      status: "Finished"
  },
   {
      name: "Go to the mall." ,
      status: "Todo"
  },
     {
      name: "Go to the gym." ,
      status: "In-Progress"
  }
    ];
  localStorage.setItem("tasks", JSON.stringify(tasks));
} else {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

displayTable();
//add new task

function addTask() {
let task = document.querySelector("#task");
  tasks.push({
    name: task.value,
    status:"Todo"
  });
  task.value = ""
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTable();
}

//Update status for clicked task
function updateStatus(index){
let statuses = ["Todo", "In-Progress", "Finished"];
  let statusIndex = statuses.indexOf(tasks[index].status);
  ++statusIndex;
  if(statusIndex > 2) statusIndex = 0;
  tasks[index].status = statuses[statusIndex];
  displayTable();
}


//Delete clicked task
function deleteTask(index){
  tasks.splice(index, 1);
  displayTable();
  
}

// Render the table js
function displayTable(){
  let table = document.querySelector("table");

while(table.childNodes.length > 0){
  table.removeChild(table.lastChild);
}

let index = 0;
  console.log("tasks", tasks)
  tasks.forEach(task => {
    let tableRow = document.createElement("tr");
    let name = document.createElement("td");
    let status = document.createElement("td");
    let deleteTask = document.createElement("td");

    name.innerText = task.name;
    status.innerText = task.status;
    status.classList.add(task.status.toLowerCase());

    deleteTask.classList.add("fa");
    deleteTask.classList.add("fa-trash");

    deleteTask.setAttribute("onclick", "deleteTask("+index+")");
    status.setAttribute("onclick", "updateStatus("+index+")");
    ++index;

                    
    
    tableRow.appendChild(name);
    tableRow.appendChild(status);
    tableRow.appendChild(deleteTask);

    table.appendChild(tableRow);
  });
}


  //check if name is already in local storage

// localStorage.setItem("tasks", JSON.stringify(tasks));

// localStorage.setItem("tasks", tasks)

// let storedSettings = JSON.parse(localStorage.getItem("tasks"));
// console.log("stored settings", storedSettings);



// let events = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

//  localStorage.setItem('tasks', JSON.stringify(events));
   
//    else {
//     eventTitleInput.classList.add('error');
//   }
// }