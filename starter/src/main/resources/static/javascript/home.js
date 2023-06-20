const cookieArr = document.cookie.split("=");
const userId = cookieArr[1];

const submitForm = document.getElementById("note-form");
const noteContainer = document.getElementById("note-container");

let noteBody = document.getElementById("note-body");
let updateNoteBtn = document.getElementById("update-note-button");

const loginLink = document.getElementById("login-link")
const registerLink = document.getElementById("register-link")

const searchForm = document.getElementById("search-bar");
const searchInput = document.getElementById("search-input");


const headers = {
  "Content-type": "application/json",
};

const baseUrl = "http://localhost:8080/api/v1/notes";

if(userId != undefined){
  loginLink.innerHTML = "Logout";
  registerLink.style.display = "None";
}

function handleLogout() {
  let c = document.cookie.split(";");
  for (let i in c) {
    document.cookie =
      /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

const handleSubmit = async (e) => {
  e.preventDefault();
  let body = {
    body: document.getElementById("note-input").value,
  };
  await addNote(body);
  document.getElementById("note-input").value = "";
};

const addNote = async (obj) => {
  const response = await fetch(`${baseUrl}/addNote/${userId}`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: headers,
  }).catch((err) => console.log(err.message));

  if (response.status === 200) {
    return getNotes(userId);
  }
};

const getNotes = async (userId) => {
  await fetch(`${baseUrl}/notesByUser/${userId}`, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => createNoteCards(data))
    .catch((err) => console.log(err.message));
};

const getNoteById = async (noteId) => {
  await fetch(baseUrl +"/noteById/"+ noteId, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => populateModal(data))
    .catch((err) => console.log(err.message));
};

const handleNoteEdit = async (noteId) => {
  let body = {
    id: noteId,
    body: noteBody.value,
  };
  await fetch(baseUrl + "/updateNote", {
    method: "PUT",
    body: JSON.stringify(body),
    headers: headers,
  })
    .then(() => {
      noteBody.innerHTML = "";
      location.reload(); // Refresh the page
    })
    .catch((err) => console.log(err.message));
};


const handleDelete = async (noteId) => {
  await fetch(baseUrl +"/deleteNote/"+ noteId, {
    method: "DELETE",
    headers: headers,
  }).catch((err) => console.log(err.message));

  return getNotes(userId);
};

const createNoteCards = (array) => {
  noteContainer.innerHTML = "";
  array.sort((a, b) => a.id - b.id)
  array.forEach((note) => {
    let noteCard = document.createElement("div");
    noteCard.classList.add("m-2");
    noteCard.innerHTML = `
        <div class="card d-flex " style="width: 18rem; height: 18rem;" >
        <img src="img/pngwing.com (1).png" class="pin">
        <div class="card-body d-flex flex-column justify-content-between" style="height: available">
          <p class="card-text">${note.body}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-danger" onclick="handleDelete(${note.id})" type="button">Delete</button>
            <button class="btn btn-primary" onclick="getNoteById(${note.id})" type="button" data-bs-toggle="modal" data-bs-target="#note-edit-modal-title">Edit</button>
          </div>
        </div>
      </div>
        `;

    noteContainer.appendChild(noteCard);
  });
};

const populateModal = (obj) => {
  noteBody.innerText = obj.body;
  updateNoteBtn.setAttribute("data-note-id", obj.id);
};

const getNotesSearched = async (userId) => {
  let result = searchInput.value.toLowerCase();
  await fetch(`${baseUrl}/notesByUser/${userId}`, {
      method: "GET",
      headers: headers,
  })
  .then((response) => response.json())
  .then((data) => {
      const filteredData = data.filter(note => {
          let noteBody = note.body.toLowerCase();
          return noteBody.includes(result);
      });

      createNoteCards(filteredData);
  })
  .catch((err) => console.log(err.message));
};


getNotes(userId)
submitForm.addEventListener('submit', handleSubmit)


updateNoteBtn.addEventListener('click', (e) => {
  let noteId = e.target.getAttribute('data-note-id');
  handleNoteEdit(noteId);
});

searchForm.addEventListener("submit", e => {
  e.preventDefault();
  getNotesSearched(userId);
});
