let modal = document.getElementById('taskModal'); // Reference to the modal
let btn = document.getElementById('addTask'); // Button to open the modal
let span = document.getElementsByClassName('close')[0]; // Close button inside modal
let createTaskBtn = document.getElementById('createTaskBtn'); // Button to create a task

// Open the modal when the "Add Task" button is clicked
btn.onclick = function () {
    modal.style.display = "block";
}

// Close the modal when the 'x' button is clicked
span.onclick = function () {
    modal.style.display = "none";
}

// Close the modal when the user clicks anywhere outside of it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// When "Create Task" button is clicked, add the task to the board
createTaskBtn.onclick = function () {
    let title = document.getElementById('taskTitle').value; // Get task title from input
    let desc = document.getElementById('taskDesc').value; // Get task description
    let priority = document.getElementById('taskPriority').value; // Get task priority

    // Check if both title and description are filled
    if (title && desc) {
        addTaskToBoard(title, desc, priority); // Add the task to the board
        modal.style.display = "none"; // Close the modal after creating the task
    } else {
        alert("Please fill in all the fields"); // Alert if any field is missing
    }
}

// Function to add the task to the board
function addTaskToBoard(title, desc, priority) {
    let cardContainer = document.createElement('div'); // Create card container
    cardContainer.clasfsName = 'card-container';

    let card = document.createElement('div'); // Create card
    card.setAttribute("class", "card");
    card.setAttribute("contenteditable", true); // Make card editable
    card.innerHTML = `<strong>${title}</strong><br>${desc}`; // Set title and description

    // Append the card to the TODO column by default
    cardContainer.append(card);
    toDoContainer.append(cardContainer);
}
