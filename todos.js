// const express = require("express");
// const bodyParser = require("body-parser")
// const app = express();
const PORT = 3000;

// app.use(bodyParser.json());

// let todos = [];

// function findIndex(arr, id)
// {
//     for(let i = 0; i < arr.length; i++)
//     {
//         if(arr[i].id === id) return i;
            
//     }
//     return -1;
// }

// function removeAtIndex(arr, id)
// {
//     let arry = [];
//     for(let i = 0; i < arr.length; i++)
//     {
//         if(i !== id) arry.push(arr[i]);
//     }
//     return arry;
// }

// app.get('/todos', (req, resp)=>{
//     resp.send(todos);
// });

// app.get('/todos/:id',(req,resp)=>{
//     const todoIndex = findIndex(todos, parseInt(req.params.id));

//     if(todoIndex === -1)
//     {
//         resp.status(404).send();
//     }  
//     else
//     {
//         resp.json(todos[todoIndex]);

//     }   
// });

// app.post('/todos', (req, resp)=>{

//     let newTodo = {
//         id: Math.floor(Math.random()* 1000000),
//         title : req.body.title,
//         description: req.body.description,
//     };

//     todos.push(newTodo);
//     resp.status(200).json(newTodo);
// });

// app.put('/todos/:id',(req,resp)=>{
//     const todoIndex = findIndex(todos, parseInt(req.params.id));

//     if(todoIndex === -1)
//     {
//         resp.status(404).send();
//     }  
//     else
//     {
//        todos[todoIndex].title = req.body.title;
//        todos[todoIndex].description = req.body.description;
//        resp.status(200).json(todos[todoIndex]);
//     }   
// });

// app.delete('/todos/:id',(req,resp)=>{
//     const todoIndex = findIndex(todos, parseInt(req.params.id));

//     if(todoIndex === -1)
//     {
//         resp.status(404).send();
//     }  
//     else
//     {
//        todos = removeAtIndex(todos, todoIndex);
//        resp.status(200).send();
//     }   
// });

// app.use((req,resp, next)=>{
//     resp.status(404).send();
// });

// module.exports = app;

// app.listen(PORT, (error)=>{
//     if(error)
//     {
//         resp.send(error);
//     }
//     else{
//         console.log(`server is running on PORT ${PORT}`);
//     }
// });



const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(cors());
function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i !== index) newArray.push(arr[i]);
  }
  return newArray;
}

app.get('/todos', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.get('/todos/:id', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      res.json(todos[todoIndex]);
    }
  });
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    description: req.body.description
  };
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
});

app.put('/todos/:id', (req, res) => {
  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      const updatedTodo = {
        id: todos[todoIndex].id,
        title: req.body.title,
        description: req.body.description
      };
      todos[todoIndex] = updatedTodo;
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).json(updatedTodo);
      });
    }
  });
});

app.delete('/todos/:id', (req, res) => {

  fs.readFile("todos.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      todos = removeAtIndex(todos, todoIndex);
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).send();
      });
    }
  });
});

app.get('/', (req, resp)=>{
    resp.send("hello");
});
// app.get('/', (req, resp)=>{
//     resp.sendFile(path.join(__dirname, "index.html"))
// })
// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

module.exports = app;

app.listen(PORT, (error)=>{
    if(error)
    {
        resp.send(error);
    }
    else{
        console.log(`server is running on PORT ${PORT}`);
    }
});

