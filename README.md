# StudentRecordSystem
A web application to add, edit and delete student record.

# Overview

The Student Record System is a web application designed to manage and display student records. Users can add, update, and delete student entries, with local storage. This allows the records to remain accessible even after a page reload.

 1. HTML (index.html)
   Purpose: Serves as the front-end layout for the user interface.
   Components:
    •	Input Form: Contains fields for entering student information, including Student ID, Name, Roll Number, and Class.
    •	Add Button: Triggers the JavaScript functions for adding or updating records.
    •	Display Section: Area for showing a list of all stored student records, including options to edit or delete each entry.
2. CSS Styling (style.css)
    •	General Styling: Sets font, colors, and background for a cohesive look.
    •	Responsive Design: Uses media queries to adjust the layout for different screen sizes, ensuring   usability on both desktop and mobile devices.
    •	Input and Button Styling:  Styles input fields, labels, and buttons, enhancing readability and user interaction.
    •	Display Section: Styles the list of student records and add hover effects to the edit and delete buttons for better UX.
3. JavaScript Logic (app.js)
Overview
Handles the core functionality for managing student records, including data validation, local storage management, and dynamic UI updates.


 Key Variables:
    •	Form Inputs: Variables for each input field (Student ID, Name, Roll, and Class) to access and manipulate user input.
    •	Flags for Editing: Flags to track if a record is being edited, preventing the accidental addition of duplicate entries.
Core Functions:
     Input Validation:
    -	Each input field has validation to restrict specific types of input:
    -	Student ID and Roll: Accept numbers only.
    -	Name and Class: Accept letters only.
    -	This prevents invalid data from being entered into the system.
 Add/Update Student Record:
    -	Checks if all fields are filled before allowing the addition or update.
    -	For new entries, assigns a unique ID based on the current timestamp (`Date.now()`), which helps uniquely identify each record.
    -	If editing an entry, the record is updated both in the display section and in local storage.
 Display Student Record:
    -	Dynamically generates HTML elements to display each student’s details in the display section.
    -	Adds "Edit" and "Delete" buttons for each record, with respective event listeners to handle record modification and deletion.
 Load Records from Local Storage:
    -	Fetches all stored records from local storage and displays them when the page loads.
    -	Ensures that data persists across sessions, so users don’t lose records upon reloading the page.
 Save to Local Storage:
    -	Stores the data in local storage as an array, allowing multiple records to be saved without overwriting.
    -	Converts the array to a JSON string for storage, which is then parsed back when retrieved.
    
 Update Record in Local Storage:
    -	Searches for a matching record based on the unique ID and updates it with the new values.
    -	Saves the modified array back to local storage.
 Delete Record:
    -	Removes a specific record from both the display and local storage based on the unique ID.
    -	Uses filtering to exclude the selected record from the array and then updates local storage.
 Remove Display Item:
       - Handles the UI update by removing a specific student entry from the display section after deletion.
       - Ensures the display reflects the current state of local storage.

Workflow

1. Adding a Record: User fills in all fields and clicks "Add". The record is saved to local storage and    displayed on the page.
2. Editing a Record: User clicks "Edit" next to a record, loads the record data into the form, updates it, and clicks "Update" to save changes.
3. Deleting a Record: User clicks "Delete" next to a record, which removes it from both the display and local storage.
4. Page Load: On page load, all saved records are fetched from local storage and displayed automatically.

Conclusion
The Student Record System effectively demonstrates data management with local storage, dynamic UI updates, and basic data validation. The app provides an efficient, user-friendly experience for managing student records with persistent data storage across sessions.

Git Hub Link:
https://github.com/Maithon921/StudentRecordSystem.git
