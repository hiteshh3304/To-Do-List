// select Dom Elements

const input=document.getElementById('todo-input');
const addBtn=document.getElementById('add-btn');
const list=document.getElementById('my-todo-list');
const dateInput=document.getElementById('todo-date');

// try to load saved todos from local storage

const saved=localStorage.getItem('todos');
const todos=saved? JSON.parse(saved):[];


function savetodos(){
    // function to save  current todos array to local storage
    localStorage.setItem('todos',JSON.stringify(todos));
}

// create a dom node for a todo object and append it to the list
function createTodoNode(todo,index){
    const li=document.createElement('li');

    // checkbox to toggle completion
    const checkbox=document.createElement('input');
    checkbox.type='checkbox';
    checkbox.checked=!!todo.completed;// '!!' will convert other data type to boolean 
    checkbox.addEventListener('change',()=>{
        todo.completed=checkbox.checked;

        // TODO:visual feedback:strike-through when completed
        textspan.style.textDecoration=todo.completed?'line-through':"";
        savetodos();


        // savetodos();
    })


    //text of the todo
    const textspan=document.createElement('span');
    textspan.textContent=todo.text;
    textspan.style.margin='0 8px';
    if(todo.completed){
        textspan.style.textDecoration='line-through';
    }

        //add the double click event listener to edit todo
        textspan.addEventListener('dblclick',()=>{
            const newText=prompt("Edit Todo",todo.text);
            if(newText!==null){
                todo.text=newText.trim();
                textspan.textContent=todo.text;
                savetodos();
                
            }
        })

        // Date span
        const dateSpan=document.createElement('span');
        dateSpan.textContent=todo.date;
        dateSpan.style.margin = '0 8px';
        dateSpan.style.fontSize = '0.9em';
        dateSpan.style.color = '#555';

        // delete button
        const delBtn=document.createElement('button');
        delBtn.textContent='Delete';
        delBtn.addEventListener('click',()=>{
            todos.splice(index,1);// remove the todo from array
            render();
            savetodos();


        })

        li.appendChild(checkbox);
        li.appendChild(textspan);
        li.appendChild(dateSpan);
        li.appendChild(delBtn);

        return li;

    

    
}

// function to render the whole todo list from thr todos array
function render(){
    list.innerHTML='';

    // recreate each item
    todos.forEach((todo,index)=>{
        const node=createTodoNode(todo,index);
        list.appendChild(node);
    });
}

function addTodo(){
    const text=input.value.trim();
    const date=dateInput.value;
    if(!text){
        return;// do not add empty todos
    }

    // push a new todo object
    todos.push({text, completed:false,date:date});
    input.value='';
    dateInput.value='';
    render();
    savetodos();
}

addBtn.addEventListener('click',addTodo);
input.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        addTodo();
    }
})

dateInput.addEventListener('keypress',(e)=>{
    if(e.key=='Enter'){
        addTodo();
    }
})
render();


