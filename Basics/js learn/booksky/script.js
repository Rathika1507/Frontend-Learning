// Get elements
const popupOverlay = document.querySelector(".popup-overlay");
const popupBox = document.querySelector(".popup-box");
const addPopupButton = document.getElementById("add-popup-button");
const cancelPopupButton = document.getElementById("cancel-popup");
const addBookButton = document.getElementById("add-book");

const container = document.querySelector(".container");
const bookTitleInput = document.getElementById("book-title-input");
const bookAuthorInput = document.getElementById("book-author-input");
const bookDescriptionInput = document.getElementById("book-description-input");

let isEditing = false;
let currentEditingDiv = null;

// Show popup
addPopupButton.addEventListener("click", () => {
  popupOverlay.style.display = "block";
  popupBox.style.display = "block";
});

// Hide popup
cancelPopupButton.addEventListener("click", () => {
  popupOverlay.style.display = "none";
  popupBox.style.display = "none";
  clearForm();
});

// Function to clear form fields
function clearForm() {
  bookTitleInput.value = "";
  bookAuthorInput.value = "";
  bookDescriptionInput.value = "";
  isEditing = false;
  currentEditingDiv = null;
  addBookButton.textContent = "ADD";
}

// Function to attach delete/edit buttons
function attachEventHandlers(bookDiv) {
  // Delete
  const deleteButton = bookDiv.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    bookDiv.remove();
  });

  // Edit
  const editButton = bookDiv.querySelector(".edit-button");
  editButton.addEventListener("click", () => {
    popupOverlay.style.display = "block";
    popupBox.style.display = "block";

    // Load existing values
    const title = bookDiv.querySelector("h2").textContent;
    const author = bookDiv.querySelector("h5").textContent;
    const description = bookDiv.querySelector("p").textContent;

    bookTitleInput.value = title;
    bookAuthorInput.value = author;
    bookDescriptionInput.value = description;

    // Set edit mode
    isEditing = true;
    currentEditingDiv = bookDiv;
    addBookButton.textContent = "UPDATE";
  });
}

// Add/Update book
addBookButton.addEventListener("click", () => {
  const title = bookTitleInput.value.trim();
  const author = bookAuthorInput.value.trim();
  const description = bookDescriptionInput.value.trim();

  if (!title || !author || !description) {
    alert("Please fill all fields!");
    return;
  }

  if (isEditing && currentEditingDiv) {
    // Update existing book
    currentEditingDiv.querySelector("h2").textContent = title;
    currentEditingDiv.querySelector("h5").textContent = author;
    currentEditingDiv.querySelector("p").textContent = description;
  } else {
    // Create new book
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-container");
    bookDiv.innerHTML = `
      <h2>${title}</h2>
      <h5>${author}</h5>
      <p>${description}</p>
      <button class="edit-button">Edit</button>
      <button class="delete-button">Delete</button>
    `;
    container.appendChild(bookDiv);
    attachEventHandlers(bookDiv);
  }

  // Reset form and hide popup
  clearForm();
  popupOverlay.style.display = "none";
  popupBox.style.display = "none";
});

// Attach handlers to existing book if present
document.querySelectorAll(".book-container").forEach(attachEventHandlers);
