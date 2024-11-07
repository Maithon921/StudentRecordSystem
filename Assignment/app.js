
const studentId = document.getElementById("studentId");
const names = document.getElementById("names");
const roll = document.getElementById("roll");
const classes = document.getElementById("classes");
const addBtn = document.querySelector(".addBtn");


// variable to use in editing
let isEditing = false;
let currentEditItemId = null;

     studentId.addEventListener("input", function () {
       // to ensure that only number is entered any character that is not a number is replaced with an empty string
        studentId.value = studentId.value.replace(/[^0-9]/g, "");
        });
    
    roll.addEventListener("input", function () { 
        // to ensure that only number is entered any character that is not a number is replaced with an empty string
        roll.value = roll.value.replace(/[^0-9]/g, "");
        });
    
    names.addEventListener("input", function () {
        // to ensure that only letter is entered any character other than alphabet is replaced with an empty string
        names.value = names.value.replace(/[^a-zA-Z ]/g, "");
        });
    
    classes.addEventListener("input", function () {
        // to ensure that only letter is entered any character other than alphabet is replaced with an empty string
        classes.value = classes.value.replace(/[^a-zA-Z ]/g, "");
        });


// eventlistener added to the document to load the saved data from the local storage 
document.addEventListener("DOMContentLoaded", loadDetailsFromStorage);

addBtn.addEventListener('click', addDetail);

function addDetail() {
    // to make sure that all input are filled we negate to return true when input value is empty and returns stopping the execution with an alert 
    if (!studentId.value || !names.value || !roll.value || !classes.value) {
        alert("Please fill all fields.");
        return;
    }

    // creating an object to store
    const detail = {
        //creating a Unique ID using date.now (making it unique) and converting it to string, also checking 
        id: isEditing ? currentEditItemId : Date.now().toString(), 
        studentId: studentId.value,
        name: names.value,
        roll: roll.value,
        class: classes.value
    };

    //for editing: if isEditing is true call the functions 
 
    if (isEditing) {
        // to update the details
        updateDetailInStorage(detail);
        // removeDisplayItem with the current id to remove temporarily
        removeDisplayItem(currentEditItemId); 
        // setting it back to normal
        isEditing = false;
        currentEditItemId = null;
        addBtn.textContent = "Add";
    } else {  // else save the details 
        saveDetailToStorage(detail);
    }
    //   display all the details present
    displayDetail(detail);

//  making the input field empty
    studentId.value = "";
    names.value = "";
    roll.value = "";
    classes.value = "";
}

// function to make the data details dsiplay 
function displayDetail(detail) {
    const display = document.querySelector(".display");

    const displayItem = document.createElement("div");
    displayItem.classList.add("displayItem");
    // giving id
    displayItem.setAttribute("data-id", detail.id);
    
    // to create div elements and giving class
    const box1 = document.createElement("div");
    box1.classList.add("box");
    const box2 = document.createElement("div");
    box2.classList.add("box");
    const box3 = document.createElement("div");
    box3.classList.add("box");
    const box4 = document.createElement("div");
    box4.classList.add("box");
    const box5 = document.createElement("div");
    box5.classList.add("box");

    // to create paragraph and giving class

    const para1 = document.createElement("p");
    para1.innerText = detail.studentId;
    const para2 = document.createElement("p");
    para2.innerText = detail.name;
    const para3 = document.createElement("p");
    para3.innerText = detail.roll;
    const para4 = document.createElement("p");
    para4.innerText = detail.class;

    // to create buttons wrap in div and giving classes

    const lastBox = document.createElement("div");
    lastBox.classList.add("last");
    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';


    // button to edit the exixting data
    editBtn.addEventListener("click", function () {
        // setting true value, id and changing text content of add button  
        isEditing = true;
        currentEditItemId = detail.id;
        addBtn.textContent = "Update";
        
        // getting the values
        studentId.value = detail.studentId;
        names.value = detail.name;
        roll.value = detail.roll;
        classes.value = detail.class;
    });

    // button to delete which will delete from display as well as local storage
    deleteBtn.addEventListener("click", function () {
        display.removeChild(displayItem);
        removeDetailFromStorage(detail.id);
    });

    //  appending or adding the paragraph to div
    box1.appendChild(para1);
    box2.appendChild(para2);
    box3.appendChild(para3);
    box4.appendChild(para4);
    box5.appendChild(lastBox);

    // adding buttons to div element which is added inside div with name box5 

    lastBox.appendChild(editBtn);
    lastBox.appendChild(deleteBtn);

    // adding all the div of box(1-5) inside displayItem div
    displayItem.appendChild(box1);
    displayItem.appendChild(box2);
    displayItem.appendChild(box3);
    displayItem.appendChild(box4);
    displayItem.appendChild(box5);

    // finally adding the displayItem div into display div
    display.appendChild(displayItem);
}

// function to load the save data from local storage
function loadDetailsFromStorage() {
    // get the details and convert to array or create new array if not available  
    const details = JSON.parse(localStorage.getItem("studentDetails")) || [];
    // display all the data available 
    details.forEach(displayDetail);
}

// function to save the details 
function saveDetailToStorage(detail) {
    // get the details and convert to array or create new array if not available
    const details = JSON.parse(localStorage.getItem("studentDetails")) || [];
    // push the object detail into array details
    details.push(detail);
    // set up or put the array into local storage by converting it into string with studentDetails as its key
    localStorage.setItem("studentDetails", JSON.stringify(details));
}

// function to update the details
function updateDetailInStorage(updatedDetail) {
    // get the details and convert to array or create new array if not available
    let details = JSON.parse(localStorage.getItem("studentDetails")) || [];
    // change value of the object using map if the id is same
    details = details.map(detail => detail.id === updatedDetail.id ? updatedDetail : detail);
    // set up or put the array into local storage by converting it into string with studentDetails as its key
    localStorage.setItem("studentDetails", JSON.stringify(details));
}

// function to remove the data from local storage and displayItem div
function removeDetailFromStorage(id) {
    let details = JSON.parse(localStorage.getItem("studentDetails")) || [];
    // filtering out the id which is not equal to the current id 
    details = details.filter(detail => detail.id !== id);
    // set up or put the array into local storage by converting it into string with studentDetails as its key
    localStorage.setItem("studentDetails", JSON.stringify(details));
}

// function to remove item from displayItem based on unique iD
function removeDisplayItem(id) {
    const display = document.querySelector(".display");
    // get specific item inside display with id matching data-id attribute
    const item = display.querySelector(`.displayItem[data-id="${id}"]`);
    // if item is true/availabe, remove the element
    if (item) {
        display.removeChild(item);
    }
}










