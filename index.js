let taskBtn = document.getElementById('addTask'); // Button to add new tasks
let toDoContainer = document.getElementById('todo'); // Reference to the TODO column

// Event listener to add a new task when the "Add Task" button is clicked
taskBtn.addEventListener("click", () => {
    // Create a new container div for the task card
    let cardContainer = document.createElement('div');
    cardContainer.style.cssText = `
      background-color: Azure;
      border: 5px solid rgb( 7, 91, 130);
      margin: 20px 10px;
      border-radius : 6px;
    `;

    // Make the card draggable for drag-and-drop functionality
    cardContainer.id = 'card-' + Date.now();
    cardContainer.setAttribute('draggable', true);

    // Event listeners for starting and ending the drag action
    cardContainer.addEventListener('dragstart', handleDragStart);
    cardContainer.addEventListener('dragend', handleDragEnd);

    // Create the task card itself and make it editable
    let card = document.createElement('div');
    card.setAttribute("class", "card");
    card.setAttribute("contenteditable", true); // Allow user to edit task details directly
    card.innerHTML = "Default Card"; // Default text for the new card

    // When the card is clicked, allow the user to overwrite the default text
    card.addEventListener("click", () => {
        if (card.innerHTML === "Default Card") {
            card.innerHTML = ""; // Clear default text when clicked
        }
    });

    // If the user leaves the card empty after editing, it gets removed
    card.addEventListener("blur", () => {
        if (card.innerHTML === "") {
            cardContainer.remove(); // Remove the card container if task is empty
        }
    });

    // Dropdown to change the status of the task (To-Do, Progress, Done)
    let dropDown = document.createElement('select');
    dropDown.innerHTML = `
        <option value="todo">TODO</option>
        <option value="progress">PROGRESS</option>
        <option value="done">DONE</option>
    `;

    // Add functionality to move the card to the respective column based on selection
    dropDown.addEventListener("change", (event) => {
        let selectedValue = event.target.value; // Get the selected value (TODO, PROGRESS, DONE)
        let columnToBeMoved = document.getElementById(selectedValue); // Find the corresponding column
        columnToBeMoved.append(cardContainer); // Move the card to the selected column
        
        // Update card border color based on the column it's moved to
        if (selectedValue === "todo") {
            cardContainer.style.border = "5px solid rgb( 7, 91, 130) ";
        } else if (selectedValue === "progress") {
            cardContainer.style.border = "5px solid #DDB64D";
        } else if (selectedValue === "done") {
            cardContainer.style.border = "5px solid #C4EA10";
        }
    });

    // Add card and dropdown to the card container
    cardContainer.append(card);
    cardContainer.append(dropDown);

    // Append the card container to the TODO column by default
    toDoContainer.append(cardContainer);
});

// Drag-and-Drop functionality for the cards
function handleDragStart(e) {
    // Store the ID of the card being dragged
    e.dataTransfer.setData('text/plain', e.target.id);

    // Hide the card after dragging starts for a smooth effect
    setTimeout(() => {
        e.target.style.visibility = 'hidden';
    }, 0);
}

function handleDragEnd(e) {
    // Make the card visible again once the drag action ends
    e.target.style.visibility = 'visible';
}

// Make the columns droppable
let columns = document.querySelectorAll('.column'); // Select all columns (TODO, PROGRESS, DONE)
columns.forEach((column) => {
    // Allow the card to be dragged over the column
    column.addEventListener('dragover', (e) => {
        e.preventDefault(); // Prevent default behavior to enable dropping
    });

    // Append the dragged card to the column where it's dropped
    column.addEventListener('drop', (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData('text/plain'); // Get the dragged card's ID
        const draggableElement = document.getElementById(cardId); // Get the dragged card element
        const dropzone = e.target; // Get the dropzone (column)

        dropzone.appendChild(draggableElement); // Move the card to the dropzone (new column)

        if (dropzone.id === "todo"){
            draggableElement.style.border = "5px solid rgb( 7, 91, 130)";
        }
        else if (dropzone.id === "progress"){
            draggableElement.style.border = "5px solid #DDB64D";
        }
        else if (dropzone.id === "done"){
            draggableElement.style.border = "5px solid #C4EA10";
        }
        e.dataTransfer.clearData(); // Clear the data after drop is complete

    });
});
