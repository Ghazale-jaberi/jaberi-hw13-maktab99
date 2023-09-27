const API_URL = "http://localhost:3002/users";

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("Description");
const dateInput = document.getElementById("Date");
const form = document.querySelector("form");

form.addEventListener("submit", (e)=>{
  todoId? saveUser(e):addUser(e)
})
//fetch
let todoId;
document.addEventListener("DOMContentLoaded", populateForm());


async function populateForm() {
  const urlParams = new URLSearchParams(window.location.search);
  todoId = urlParams.get("id");
  if (todoId) {
    const response = await fetch(API_URL + "/" + todoId);
    const userData = await response.json();
    titleInput.value = userData.title;
    descriptionInput.value = userData.description;
    dateInput.value = userData.date;
    
  }
}

/*
///todos
const bodyElement = document.querySelector("#usersDiv");
let userId;
function renderUsers(usersData = []) {
  usersData?.map((user) => {
    const { id, title, description,date } = user;
    bodyElement.innerHTML += `<div class="usersDiv" id="usersDiv">
    <ul class="users">
      <li>${id}</li>
      <li>${title}</li>
      <li>${description}</li>
      <li>${date}</li>
    </ul>
  </div>`;
  });
}

async function getUsers() {
  const response = await fetch(API_URL);
  const usersData = await response.json();
  renderUsers(usersData);
}*/

//add user

async function addUser(e) {
  e.preventDefault();

  const formData = {
    title: titleInput.value,
    description: descriptionInput.value,
    date: dateInput.value,
    isDone: false,
    updatedAt: Date.now(),
    createdAt: Date.now(),
    id: Date.now(),
  };

  fetch(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      titleInput.value = "";
      descriptionInput.value = "";
      dateInput.value = "";
      console.log(json);

      Toastify({
        text: "Submitted successfully✅",
        duration: 3000, 
        gravity: "top", 
        position: "center", 
        backgroundColor: "linear-gradient(to right, #11998e, #38ef7d)", 
      }).showToast();
  
    })
    .catch((error) => {
      console.error(error);
    });
}



//

async function saveUser(e) {
  e.preventDefault();

  const formData = {
    title: titleInput.value,
    description: descriptionInput.value,
    date: dateInput.value,
    updatedAt: Date.now(),
  };

  fetch(`${API_URL}/${todoId}`, {
    method: "PATCH",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      titleInput.value = "";
      descriptionInput.value = "";
      dateInput.value = "";
      console.log(json);
      Toastify({
        text: "Edited successfully🖍️",
        duration: 3000, 
        gravity: "top", 
        position: "center", 
        backgroundColor: "linear-gradient(to right, #11998e, #38ef7d)", 
      }).showToast();
    })

    .catch((error) => {
      console.error(error);
    });
}

//


