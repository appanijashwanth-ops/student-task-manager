let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks(){

let list=document.getElementById("taskList");
list.innerHTML="";

let completed=0;

tasks.forEach((task,index)=>{

let li=document.createElement("li");

if(task.done) completed++;

li.innerHTML=
task.name+" | "+task.date+
` <button class="complete" onclick="completeTask(${index})">Done</button>
<button class="delete" onclick="deleteTask(${index})">Delete</button>`;

list.appendChild(li);

});

updateProgress(completed);

localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){

let name=document.getElementById("taskInput").value;
let date=document.getElementById("deadline").value;

if(name==="") return;

tasks.push({
name:name,
date:date,
done:false
});

displayTasks();

document.getElementById("taskInput").value="";
}

function deleteTask(index){

tasks.splice(index,1);
displayTasks();

}

function completeTask(index){

tasks[index].done=true;
displayTasks();

}

function updateProgress(completed){

let percent=0;

if(tasks.length>0){
percent=(completed/tasks.length)*100;
}

document.getElementById("progress").style.width=percent+"%";

}

displayTasks();