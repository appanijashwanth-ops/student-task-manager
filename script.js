let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){

localStorage.setItem("tasks", JSON.stringify(tasks));

}

function addTask(){

let text=document.getElementById("taskInput").value;

let date=document.getElementById("taskDate").value;

let priority=document.getElementById("taskPriority").value;

if(text=="" || date==""){

alert("Enter task and date");

return;

}

let task={

text:text,

date:date,

priority:priority,

status:"Assigned"

};

tasks.push(task);

saveTasks();

displayTasks();

document.getElementById("taskInput").value="";

}

function moveTask(index){

if(tasks[index].status=="Assigned")

tasks[index].status="In Progress";

else if(tasks[index].status=="In Progress")

tasks[index].status="Completed";

saveTasks();

displayTasks();

}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();

displayTasks();

}

function displayTasks(){

let assigned=document.getElementById("assignedList");

let progress=document.getElementById("progressList");

let completed=document.getElementById("completedList");

assigned.innerHTML="";

progress.innerHTML="";

completed.innerHTML="";

let completedCount=0;

tasks.forEach((task,index)=>{

let li=document.createElement("li");

let priorityClass="";

if(task.priority=="High") priorityClass="priorityHigh";
if(task.priority=="Medium") priorityClass="priorityMedium";
if(task.priority=="Low") priorityClass="priorityLow";

li.innerHTML=

"<b>"+task.text+"</b><br>"+

"Deadline: "+task.date+"<br>"+

"<span class='"+priorityClass+"'>Priority: "+task.priority+"</span><br>"+

"<button onclick='moveTask("+index+")'>Move</button> "+

"<button onclick='deleteTask("+index+")'>Delete</button>";

if(task.status=="Assigned") assigned.appendChild(li);

if(task.status=="In Progress") progress.appendChild(li);

if(task.status=="Completed"){

completed.appendChild(li);

completedCount++;

}

});

document.getElementById("totalTasks").innerText=tasks.length;

document.getElementById("completedTasks").innerText=completedCount;

let percent=0;

if(tasks.length>0)

percent=(completedCount/tasks.length)*100;

document.getElementById("progressBar").style.width=percent+"%";

}

function searchTask(){

let input=document.getElementById("searchTask").value.toLowerCase();

let tasksList=document.querySelectorAll("li");

tasksList.forEach(task=>{

if(task.innerText.toLowerCase().includes(input))

task.style.display="block";

else

task.style.display="none";

});

}

displayTasks();