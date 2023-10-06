let form= document.getElementById('form');
let task= document.getElementById('task');
let textInput= document.getElementById('textInput');
let dateInput= document.getElementById('dateInput');
let textarea= document.getElementById('textarea');
let add= document.getElementById('add');
form.addEventListener('submit', function(e){
    e.preventDefault();
    formvalidation();
});

let formvalidation=()=>{
    
    if(textInput.value===""){
        alert("Please enter a task");
    }
    else{
        acceptData();
        add.setAttribute('data-bs-dismiss','modal');
        add.click();
        (()=>{
            add.setAttribute('data-bs-dismiss','');

        })();
    }
}
let data=[];

let acceptData=()=>{
    let task= textInput.value;
    let date= dateInput.value;
    let description= textarea.value;
    data.push({
        task: task,
        date: date,
        description: description
    });
localStorage.setItem('data',JSON.stringify(data));
   createTask();
}
let createTask=()=>{
    task.innerHTML="";
    data.map((x,y)=>{
        return task.innerHTML+=`
        <div id=${y}>
        <span class="fw-bold">${x.task}</span>
        <span class="small ">${x.date}</span>
        <p>${x.description}</p>
        <span class="options">
           <abbr title="Edit Task"> <i class="fas fa-edit" onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"></i></abbr>
           <abbr title="Delete Task"> <i class="fas fa-trash" onClick="deleteTask(this)"></i></abbr>
        </span>
        </div>
        `
    })

resetform();
}

let resetform=()=>{
    textInput.value="";
    dateInput.value="";
    textarea.value="";
}

let deleteTask=(e)=>{
    e.parentElement.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.parentElement.id, 1);
    localStorage.setItem("data",JSON.stringify(data));
}
let editTask=(e)=>{
   let selectedtask=e.parentElement.parentElement.parentElement;

    textInput.value=selectedtask.children[0].innerHTML;
    dateInput.value=selectedtask.children[1].innerHTML;
    textarea.value=selectedtask.children[2].innerHTML;
   deleteTask(e);
}


(()=>{
    data=JSON.parse(localStorage.getItem("data"))|| []
    createTask();
})();