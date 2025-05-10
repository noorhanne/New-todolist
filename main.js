let create = document.getElementById('create');
let input = document.getElementById('input');
let yourTask = document.getElementById('yourTask');
let mood = 'create';
let tmp;
let taskData;

// save localstorage
if(localStorage.tasks != null){
    taskData = JSON.parse(localStorage.tasks)
    readTasks()
}
else{
    taskData = [];
}
// add task 
create.onclick =()=>{
    let newTask = {
        input : input.value,
        yourTask : yourTask.value,
        completed: false,
    }
 if(input.value != ''){
   if(mood == 'create'){
    taskData.push(newTask)
   }
   else{
    taskData[tmp] = newTask;
    create.innerHTML = 'Create';
    mood = 'create'
   }
 }
localStorage.setItem('tasks', JSON.stringify(taskData))
readTasks();
clearData();
}
// read tasks

function readTasks(){
    let table= '';
    for(let i = 0 ; i < taskData.length ; i++)  
 { 
    table += `
       <tr class='flex gap-16 items-center justify-center max-sm:gap-2 '>
            <td class='myTask pl-18 max-sm:pl-2' style="text-decoration: ${taskData[i].completed ? 'line-through' : 'none'}; color: ${taskData[i].completed ? 'red' : 'black'};">${i+1}-</td>
            <td class='myTask pl-6 max-sm:pl-2' style=" text-decoration: ${taskData[i].completed ? 'line-through' : 'none'}; color: ${taskData[i].completed ? 'red' : 'black'};">${taskData[i].input}</td>
            <td><button onclick='toggleBtn(${i})' class='p-3 toggle cursor-pointer ml-4' style="text-decoration: ${taskData[i].completed ? 'line-through' : 'none'}; color: ${taskData[i].completed ? 'red' : 'blue'};">Toggle</button></td>
            <td><button onclick="updateBtn(${i})" class='p-1 cursor-pointer  bg-red-500 rounded-lg text-blue-700'>update</button></td>
            <td><button id='delete' onclick="deleteBtn(${i})" class='p-1 bg-red-500 rounded-lg text-blue-700 cursor-pointer mr-16'>delete</button></td>
        </tr>
 
    `

}
    document.getElementById('tbody').innerHTML = table;
    localStorage.tasks = JSON.stringify(taskData);
// activate deleteAllButton
 let deleteAllButton = document.getElementById('deleteAll');
if(taskData.length > 0){
    deleteAllButton.innerHTML = `
     <button class="cursor-pointer text-center p-2 bg-red-100 text-red-500 rounded-lg hover:bg-sky-200" id="deleteAll" onclick="deleteAll()">DELETE ALL</button>
    `
}
else{
    deleteAllButton.innerHTML = '';
    deleteAllButton.style.display='none';
    tbody.style.display = 'none'
}
}
// deleteAll button
function deleteAll(){
    localStorage.clear();
    taskData.splice(0);
    readTasks();
}
// toggleBtn
  function toggleBtn(i) {
    let toggleButton = document.querySelector('.toggle');
    let myTask = document.querySelector('.myTask');
    if(toggleButton){
        toggleButton.style.textDecoration = 'line-through';
        myTask.style.textDecoration = 'line-through';
    }
    taskData[i].completed = !taskData[i].completed;
    localStorage.setItem('tasks' , JSON.stringify(taskData))
    readTasks()
}

// deleteBtn
function deleteBtn(i){
    taskData.splice(i,1);
    localStorage.tasks = JSON.stringify(taskData)
    readTasks()

}
// updateBtn
function updateBtn(i){
    input.value = taskData[i].input;
    tmp = i;
    mood = 'Edit';
    create.innerHTML = 'Edit';
    scroll(
      {
        top:0 ,
        behavior: "smooth"
      }
    )
    readTasks()

}
// clear input
function clearData(){
    input.value= '',
    yourTask.value=''
}





