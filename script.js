
let notesData = JSON.parse(localStorage.getItem("myNotes")) || [];

let newNotesButton = document.querySelector(".notesNew");
let notesModal = document.querySelector(".notesModal");
let notesForm = document.querySelector(".notesForm");
let closeForm = document.querySelector(".closeForm");
let notesList = document.querySelector(".notesList");
let searchEl = document.querySelector(".search");
console.log(notesData);

//Open Modal

newNotesButton.addEventListener("click", function(){
    notesModal.classList.add("active");
})

//Hide Modal

closeForm.addEventListener("click",function(){
    notesModal.classList.remove("active");
})




//handle notes form

notesForm.addEventListener("submit", function(e){
    e.preventDefault();

    //handle notes data
    let title = e.target.noteTitle.value;
    let content = e.target.noteEntry.value;
    
    let noteObject = createNoteObj(title,content);
    notesData.push(noteObject);

    localStorage.setItem("myNotes",JSON.stringify(notesData));
    
    //handle notes ui with data created
    populateNotes(notesData);
    notesModal.classList.remove("active");
    console.log(notesData);
    e.target.reset();
 })

 populateNotes(notesData);

 function populateNotes(notesData){
   let allNotes =  notesData.map((note) =>{
        return ` <div class="notesItem">
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <div class="notesMeta">
          <button class="notesDelete" data-id=${note.id}> <img src="./assets/trash.svg" height="12" alt=""> Delete</button>
        </div>
      </div> ` ;
    }).join("");
    
    notesList.innerHTML = allNotes; 
    console.log(allNotes);
 }

 function createNoteObj(title,content){
    
    let newNote = {
        title : title,
        content : content,
        id : crypto.randomUUID()
    }
    return newNote;
}

let buttons = document.querySelectorAll(".notesDelete");

document.addEventListener("click", function(e){
   if(e.target.classList.contains("notesDelete")){
    let id = e.target.dataset.id;

    let shouldDelete = confirm("Are you sure to delete this note?")

    if(shouldDelete){
        notesData = notesData.filter((note) =>{
            return note.id !== id;
         })
         localStorage.setItem("myNotes",JSON.stringify(notesData));
         populateNotes(notesData);
    }
    
   
   }
 })

 