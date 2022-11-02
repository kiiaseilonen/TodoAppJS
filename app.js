window.addEventListener('load', () => {
  todos = JSON.parse(localStorage.getItem('todos')) || []; 

    // Haetaan elementtejä html-tiedostosta
    const form = document.getElementById("todoForm");
    const input = document.getElementById("newTodo");

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
    const task = {
                  content: input.value,
                  done: false,
                  valid: true                            
                }

    // Jos käyttäjä ei syötä mitään, annetaan alert
    if (task.content == '' || task.content.length <= 3) {
      task.valid = false;
      document.getElementById("newTodo").style.border = "2px solid red";
        alert("Your task should have more than 3 characters");
        return;
    } else {
      task.valid = true;
      document.getElementById("newTodo").style.border = "none";
    }

   todos.push(task);

    localStorage.setItem('todos', JSON.stringify(todos));

    // Tyhjennetään input-kenttä
		e.target.reset();

    DisplayTodos()
  })

  DisplayTodos()

})

  function DisplayTodos() {

    const todosHolder = document.getElementById("tasks");
    const checkedTodosHolder = document.getElementById("completed-tasks");
    const resetBtn = document.getElementById("resetBtn");
    

    todosHolder.innerHTML="";
    checkedTodosHolder.innerHTML="";
    
    // Luodaan elementtejä ja annetaan niille classit
    todos.forEach(task => {

      const taskHolder = document.createElement("div");
      taskHolder.classList.add("task");

      const checkElement = document.createElement("input");
      checkElement.classList.add("check");
      checkElement.type ="checkbox";
      checkElement.checked = task.done;

      const taskInput = document.createElement("input");
      taskInput.classList.add("text");
      taskInput.type = "text";
      taskInput.value = task.content;

      const taskActionsHolder = document.createElement("div");
      taskActionsHolder.classList.add("actions");
      
      const taskDeleteElement = document.createElement("input");
      taskDeleteElement.classList.add("delete");
      taskDeleteElement.src = "images/trash.png";
      taskDeleteElement.type = "image";

      // Ladataan elementit näytölle
      taskHolder.appendChild(checkElement);
      taskHolder.appendChild(taskInput);
      taskHolder.appendChild(taskActionsHolder);
      taskActionsHolder.appendChild(taskDeleteElement);
      todosHolder.appendChild(taskHolder);
      
      if (task.done) {  
              taskHolder.classList.add("done");
              checkedTodosHolder.appendChild(taskHolder);
              } 

      // Luodaan evenListener tehtävän poistamiseksi listalta
          taskDeleteElement.addEventListener('click', (e) => {
            if (taskHolder.classList == "task"){
              todosHolder.removeChild(taskHolder);
            } else {
              checkedTodosHolder.removeChild(taskHolder);
            }
              todos = todos.filter(t => t != task);
              localStorage.setItem('todos', JSON.stringify(todos));
          });

      // Jos tehtävä merkitään tehdyksi se siirtyy Compelted Todos-osioon
            checkElement.addEventListener('click', (e) => {
              task.done = e.target.checked;
              localStorage.setItem('todos', JSON.stringify(todos));
              if (task.done) {                       
                  taskHolder.classList.add("done");
                  checkedTodosHolder.appendChild(taskHolder);
                  } else {
                  taskHolder.classList.remove("done");
                  todosHolder.appendChild(taskHolder);
                  }                                 
            }) 

        // Tyhjentää LocalStoragen
            resetBtn.addEventListener('click', function () {
                localStorage.clear();
                window.location.reload(true);            
            }) 
    })
  }

    
    


   
    
  



     


