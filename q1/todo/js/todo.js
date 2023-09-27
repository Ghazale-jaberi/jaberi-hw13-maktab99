const API_URL = "  http://localhost:3002/users";

//fetch

async function Users() {
  try {
    const url = new URL(window.location.href);
    const page = url.searchParams.get("page");
    const response = await fetch(API_URL + `?_page=${page}&_limit=10`);
    const userData = await response.json();

if(!response.ok){
throw new Error("notFound")
}
    return userData;
  } catch {
    location.assign("http://127.0.0.1:5500/404.html");
  }
}

async function getUsers() {
  const data = await Users();
  renderUsers(data);
}

document.addEventListener("DOMContentLoaded", getUsers());

async function dokme() {
  const response = await fetch(API_URL);
  const usersData = await response.json();
  const pageCount = Math.ceil(usersData.length / 10);
  for (let i = 1; i <= pageCount; i++) {
    const button = document.createElement("button");
    button.setAttribute("id", i);
    button.setAttribute("class", "btn");
    button.innerHTML = i;
    document.querySelector(".pagination").append(button);
  }
}
document.querySelector(".pagination").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    const url = new URL(window.location.href);
    url.searchParams.set("page", e.target.id);
    history.pushState({}, "", url);
    getUsers();
  }
});
dokme();
///todos
const bodyElement = document.querySelector("#usersDiv");
//2
/*
function renderUsers(usersData = []) {
  usersData?.map((user) => {
    const { id, title, description,date } = user;
    bodyElement.innerHTML += `
    <div onclick="openModal(${id})"  type="button"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    data-bs-whatever="@fat"  ">
    <div  class="usersDiv class="container " id="usersDiv" >
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                <h5 class="card-title"> ${id}</h5>
                
                    <h5 class="card-title"> ${title}</h5>
                    <div class="d-flex justify-content-end p-2 ">
                    <i class="bi bi-pen "></i>
                    <i class="bi bi-trash" onclick="openModal(${id})" ></i>
                   
                  </div>
                    <h6 class="card-subtitle mb-2 text-muted">${date} </h6>
                    <p class="card-text">${description}</p>
                </div>
            </div>
        </div>
    </div>
  </div>


  `;
  });
}
*/
let userId;

function renderUsers(usersData = []) {
  // Clear the bodyElement before rendering users
  bodyElement.innerHTML = "";

  usersData?.map((user) => {
    const { id, title, description, date } = user;
    bodyElement.innerHTML += `
      <div class="usersDiv container" id="usersDiv">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="card">
              <div class="card-body">
              <input type="checkbox" onclick="changedIsDone(${id})"  id="isDone" class="cursor-pointer" >
               
                <h5 class="card-title">${title}</h5>
                <div class="d-flex justify-content-end p-2">
                <i class="bi bi-pen" onclick="redirectToEditPage(${id})"></i>
                <i class="bi bi-trash" onclick="openModal(${id})"></i>
              </div>
              <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
              <p class="card-text">${description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  });
}

//edith
function redirectToEditPage(userId) {
  const editUrl = `index.html?id=${userId}`;

  window.location.href = editUrl;
}

// Modal
const openModal = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const userData = await response.json();
  document.getElementById("title").value = userData && userData.title;
  document.getElementById("Date").value = userData && userData.date;

  userId = id;

  // Open the modal programmatically
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
};

// Delete
function deleteUser() {
  fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // Close the modal after deletion
      const modal = new bootstrap.Modal(
        document.getElementById("exampleModal")
      );
      modal.hide();
      getUsers();
    });
}

//2

//
/*
// Declare userId
let userId;

function renderUsers(usersData = []) {
  // Clear the bodyElement before rendering users
  bodyElement.innerHTML = "";

  usersData?.map((user) => {
    const { id, title, description, date } = user;
    bodyElement.innerHTML += `
      <div class="usersDiv container" id="usersDiv">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${id}</h5>
                <h5 class="card-title">${title}</h5>
                <div class="d-flex justify-content-end p-2">
                  <i class="bi bi-pen"></i>
                  <i class="bi bi-trash" onclick="openModal(${id})"></i>
                </div>
                <h6 class="card-subtitle mb-2 text-muted">${date}</h6>
                <p class="card-text">${description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

// Modal
const openModal = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const userData = await response.json();
  document.getElementById("title").value = userData && userData.title;
  document.getElementById("Date").value = userData && userData.date;

  userId = id;

  // Open the modal programmatically
  const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
  modal.show();
};

// Delete
function deleteUser() {
  fetch(`${API_URL}/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      // Close the modal after deletion
      const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
      modal.hide();
    });
}
*/

//
//isDone
/*
const changedIsDone = async (id) => {
  const checkbox = document.querySelector("#isDone");
  const isChecked = checkbox.checked;
  try {
  await fetch(`http://localhost:3000/tasks/${id}`, {
  method: "PATCH",
  body: JSON.stringify({ isDone: isChecked }),
  headers: { "Content-Type": "application/json" },
  });
  } catch {
  console.error("Error:", error);
  }
 };
*/
//

async function changedIsDone(id){
  const user2= await fetch(`http://localhost:3002/users/${id}`)
  const user3= await user2.json() 
  console.log(user3.isDone);
  try {

    await fetch(`http://localhost:3002/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ isDone: user3.isDone ? false : true }),
    headers: { "Content-Type": "application/json" },
    });
    } catch {
    console.error("Error:", error);
    }
   };

