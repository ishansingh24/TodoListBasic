/* function to apply GET Http request*/
function getData()
{
    fetch("http://localhost:3000/todos",()=>{
        method: "GET"
    }).then(async x =>{
        let data = await x.json()
        console.log(data);
        let parentElement = document.getElementById("mainArea");
        for (let i = 0; i < data.length; i++) {
            // Create a parent container for each todo item
            let childElement = document.createElement("div");
            childElement.classList.add("todo-item"); // Add a class for styling
            childElement.dataset.id = data[i].id;  
        
            // Create a span for the title and add a class
            let grandChildElement = document.createElement("span");
            grandChildElement.classList.add("todo-title"); // Add a class for styling
            grandChildElement.innerHTML = data[i].title;
        
            // Create a span for the description and add a class
            let grandChildElement2 = document.createElement("span");
            grandChildElement2.classList.add("todo-description"); // Add a class for styling
            grandChildElement2.innerHTML = data[i].description;

            // Create a delete button and add a class
            let grandChildElement3 = document.createElement("button");
            grandChildElement3.classList.add("delete-btn"); // Add a class for styling
            grandChildElement3.innerHTML = "Delete";
            
            // Append the title, description, and button to the parent div
            childElement.append(grandChildElement);
            childElement.append(grandChildElement2);
            childElement.append(grandChildElement3);
        
            // Append the parent element to the main area
            parentElement.append(childElement);
        }
        // here this function is called because this delete button is dynamically added here...so attaching the event listener
        deleteItem();
    })
}
getData();

function deleteItem() {
let deleteElements = document.getElementsByClassName("delete-btn");

// Loop through all delete buttons and add event listeners
for (let i = 0; i < deleteElements.length; i++) {
deleteElements[i].addEventListener('click', function () {
    // The `this` keyword refers to the button that was clicked
    let todoItem = this.closest('.todo-item'); // Find the closest todo-item parent div
    console.log(todoItem.dataset.id);
    if (todoItem) {
        // Get the id of the todo item from the data-id attribute
        let todoId = todoItem.dataset.id;
        
        // Send a DELETE request to the server to remove the item
        fetch('http://localhost:3000/todos/' + todoId, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                todoItem.remove();  // Remove the todo item from the DOM if the request was successful
                alert("Todo item deleted");
            } else {
                alert("Failed to delete item");
            }
        })
        .catch(error => {
            console.error("Error deleting item:", error);
            alert("Error deleting item");
        });
    }
});
}
}
function onPress() {
const title = document.getElementById('title').value;
const description = document.getElementById('description').value;

if (!title || !description) {
alert("Please fill in both title and description!");
return;
}

const data = {
title: title,
description: description
};

fetch("http://localhost:3000/todos", {
method: "POST",
headers: {
    "Content-Type": "application/json",  // Indicate that we're sending JSON
},
body: JSON.stringify(data)  // Convert the data to a JSON string
})
.then(async (response) => {
if (response.ok) {
    const result = await response.json();  // Parse the JSON response
    console.log("Response:", result);  // Log the response (e.g., success message)
} else {
    console.error("Failed to send todo:", response.status);
}
})
.catch((error) => {
console.error("Error occurred:", error);  // Log any error that occurs during the fetch
});
}