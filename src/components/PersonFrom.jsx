import React from "react";
import { fetchData } from "../utils/fecthData";

const PersonForm = ({ setStudents, classes }) => {
  const url = "http://localhost:3000/students";

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    delete formJson.id; // Remove `id` as it's managed by the backend

    // Convert the selected class to an array of IDs
    formJson.classes = [parseInt(formJson.class)];

    // Use fetchData for the POST request
    fetchData(url, (newStudent) => {
      // After adding a new student, update the state to include the new student
      setStudents((prevStudents) => [...prevStudents, newStudent]);
    }, "POST", formJson);
  };

  return (
    <form onSubmit={handleSubmit}>      
      <label htmlFor="name">Name</label>
      <input name="name" type="text" placeholder="Enter name" /><br />

      <label htmlFor="age">Age</label>
      <input name="age" type="number" min="1" max="120" placeholder="Enter age" /><br />

      <label htmlFor="email">Email</label>
      <input name="email" type="email" placeholder="Enter email" /><br />

      <label htmlFor="class">Class</label>
      <select name="class">
        <option value="1">Math 101</option>
        <option value="2">History 201</option>
      </select> <br />
      <button type="submit">Add Person</button>
    </form>
  );
};
export default PersonForm;
