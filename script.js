const inputelement = document.querySelector("#inputvalue");
const btnadd = document.querySelector(" #addbtn");
const div = document.getElementsByClassName("list")[0];

//Get Storage

function getstorage() {
  return JSON.parse(localStorage.getItem("to-do-list") || "[]");
}

// Create Div and Lists

function addlist(id, content, storagemonth, storagedate, storageyear) {
  let list = document.createElement("div");
  let p = document.createElement("p");
  let btn1 = document.createElement("button");
  let btn2 = document.createElement("button");
  list.classList.add("note");
  btn1.id = "done";
  btn2.id = "del";
  btn1.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
  btn2.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`;
  p.textContent = content;
  list.appendChild(p);
  list.appendChild(btn1);
  list.appendChild(btn2);
  div.appendChild(list);

  //Displaying Created Date
  let datediv = document.createElement("div");
  let datetag = document.createElement("span");
  let monthtag = document.createElement("span");
  let yeartag = document.createElement("span");
  datetag.textContent = storagedate;
  monthtag.textContent = storagemonth;
  yeartag.textContent = storageyear;
  datediv.classList.add("displaydate");
  datediv.appendChild(monthtag);
  datediv.appendChild(datetag);
  datediv.appendChild(yeartag);

  div.appendChild(datediv);

  // Done and Delete button

  btn1.addEventListener("click", () => {
    const notes = getstorage();
     
    
      const updatedArray = notes.map((obj) => {
        if (obj.id === id) {
          return { ...obj, content: "--- Finished ---" };
        }
        return obj;
      });
      p.innerHTML = `--- Finished ---`;
      savenotes(updatedArray);
      
    
  });
  btn2.addEventListener("click", () => {
    const notes = getstorage();
    const b = notes.filter((e) => {
      return e.id != id;
    });
    const check = confirm("Are You Sure to Delete the list?");
    if (check) {
      savenotes(b);
      div.removeChild(list);
      div.removeChild(datediv);
    }
  });
}

//Create List for Already Lists

getstorage().forEach((element) => {
  // console.log(element.id);
  addlist(
    element.id,
    element.content,
    element.month,
    element.date,
    element.year
  );
});

// Save Notes

function savenotes(notes) {
  localStorage.setItem("to-do-list", JSON.stringify(notes));
}

//  Function for add btn click

btnadd.addEventListener("click", addnotes);

function addnotes() {
  let todaydate = new Date();
  let month = todaydate.toLocaleString("default", { month: "long" });
  let date = todaydate.getDate() + " ,";
  let year = todaydate.getFullYear();
  let notes = getstorage();
  const noteobj = {
    id: Math.floor(Math.random() * 1000),
    content: inputelement.value,
    month: month,
    date: date,
    year: year,
  };
  if (inputelement.value.trim() == "") {
    alert("Enter the Notes to Add!!!");
  } else {
    addlist(
      noteobj.id,
      inputelement.value,
      noteobj.month,
      noteobj.date,
      noteobj.year
    );
    notes.push(noteobj);
    savenotes(notes);
  }
}
