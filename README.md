# Student Management App

## Overview
This is a simple React application to manage a list of students. It allows users to view, edit, and delete students. The app interacts with a backend API to fetch and update student data.

## Features
- View the list of students in a table.
- Edit student details (name, age, email).
- Delete students.
- Modal form for editing and adding new students.

## Project Flow

1. **Initial State**:
   - The app starts by displaying a list of students fetched from the server (`GET` request to `http://localhost:3000/students`).

2. **Viewing Students**:
   - The students are displayed in a table format with columns: Id, Name, Age, Email, Classes, and Actions.
   - Users can see basic information about each student.

3. **Editing a Student**:
   - When the "Edit" button is clicked, a modal opens with the student's details pre-filled in the form.
   - The form allows users to edit the student's name, age, and email.
   - The changes are submitted with a `PUT` request to update the student on the backend.

4. **Adding a New Student**:
   - When the "Add New Student" button (if implemented) is clicked, a similar modal opens with empty fields.
   - The user can input the new student's details, which are sent to the backend with a `POST` request.

5. **Deleting a Student**:
   - The "Delete" button removes a student from the list by sending a `DELETE` request to the server.

## Modal Behavior
- **Edit Mode**: When editing, the modal has a blue header and a "Save Changes" button.
- **New Mode**: When adding a new student, the modal has a green header and an "Add Student" button.

