axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'


// GET REQUEST
const getTodos = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        showOutput(response)
    }   catch(err) {
        console.log(err)
    }
}


// POST REQUEST
const addTodo = async() =>  {
 try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title : "node js engineer",
        completed : true
    });
    showOutput(response)
 }  catch(err) {
    console.log(error)
 }
}

// PUT/PATCH REQUEST
const updateTodo = async() => {
  try{
        const request = await axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
          title : "Updated TODO",
          completed : true
        });

        showOutput(request)
  } catch(err) {
      console.log(err)
  }
}

// DELETE REQUEST
const removeTodo = async() => {
    try{
        const request = await axios.delete('https://jsonplaceholder.typicode.com/todos/1');
        showOutput(request)
  } catch(err) {
      console.log(err)
  }
}


// SIMULTANEOUS DATA
const getData = async() => {
    try {
        const response = await axios.all([
            axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
            axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
        ])
        console.log(response[0])
        console.log(response[1])
        showOutput(response[0])
       
    }   catch(err) {
        console.log(err)
    }

}

// CUSTOM HEADERS
const customHeaders = async() => {
    try { // logged in to create post
        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : 'sometoken'
            }
        }

        const request = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title : 'New Todo',
            completed : false
        }, config)
       showOutput(request)

    }   catch(err) {
        console.log(err)
    }

}


// ERROR HANDLING
const errorHandling = async() => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todosss')
        showOutput(response)
    }   catch(err) {
        if(err.response) {
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } 
    }
}




// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request send to ${config.url} at ${new Date().getTime()}`)
    return config
})






// Show output in browser
const showOutput = (res) => {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>


    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>

      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>

    </div>


    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>

      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>

    </div>


    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>

      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>

    </div>
  `;
}




const getBtn = document.getElementById("get");
const postBtn = document.getElementById("post");
const putBtn = document.getElementById("update");
const deleteBtn = document.getElementById("delete");
const simBtn = document.getElementById("sim");
const customHeaderBtn = document.getElementById("headers");
const errorBtn = document.getElementById("error");





getBtn.addEventListener("click", getTodos);
postBtn.addEventListener("click", addTodo);
putBtn.addEventListener("click", updateTodo);
deleteBtn.addEventListener("click", removeTodo);
simBtn.addEventListener("click", getData);
customHeaderBtn.addEventListener("click", customHeaders);
errorBtn.addEventListener("click", errorHandling);

