import React, { useState } from 'react';

// Component: StudentList
const StudentList = ({ students, setStudents, classes }) => {
  const API_URL = 'http://localhost:3000/students';

  // State to manage the modal for editing student details
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for the currently selected student
  const [selectedStudent, setSelectedStudent] = useState(null);

  // State for the student data being edited (name, age, email)
  const [formData, setFormData] = useState({ name: '', age: '', email: '' });

  // State to manage the modal for editing student classes
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);

  // State to store the selected classes for the student
  const [selectedClasses, setSelectedClasses] = useState([]);

  /** -----------------
   * GET Class Names by classIds
   ------------------*/
  const getClassNames = (classIds) => {
    return classIds
      .map((id) => {
        const foundClass = classes.find((cls) => cls.id === String(id)); // Convert ID to string if necessary
        return foundClass ? foundClass.name : null; // Return class name or null
      })
      .filter((name) => name) // Filter out null values
      .join(", "); // Join class names into a comma-separated string
  };

  /** -----------------
   * CRUD OPERATIONS
   ------------------*/

  // Delete a student from the database and update local state
  const deleteStudent = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => {
        // Remove deleted student from the local state
        setStudents((prevStudents) =>
          prevStudents.filter((student) => student.id !== id)
        );
      });
  };

  // Open the Edit Modal and pre-fill the form with the student's current details
  const openEditModal = (student) => {
    setSelectedStudent(student); // Set the student being edited
    setFormData({ name: student.name, age: student.age, email: student.email }); // Pre-fill form data
    setIsModalOpen(true); // Open the modal
  };

  // Open the Class Edit Modal and pre-fill it with the student's current classes
  const openClassEditModal = (student) => {
    setSelectedStudent(student); // Set the selected student
    setSelectedClasses(student.classes); // Pre-fill with the student's current classes
    setIsClassModalOpen(true); // Open the modal
  };

  // Close the Edit Modal
  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  // Close the Class Edit Modal
  const closeClassEditModal = () => {
    setIsClassModalOpen(false);
  };

  // Save the edited student details (name, age, email) to the database
  const saveStudent = (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    // Prepare the updated student object with new details
    const updatedStudent = {
      ...selectedStudent,
      name: formData.name,
      age: formData.age,
      email: formData.email,
    };

    // Send the updated student details to the server
    fetch(`${API_URL}/${selectedStudent.id}`, {
      method: 'PUT', // Use PUT to update all fields of the student
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent),
    })
      .then((res) => res.json())
      .then((updatedStudent) => {
        // Update the student in local state with the new data
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );
        closeEditModal(); // Close the modal after saving
      });
  };

  // Save the student's updated classes to the database (PATCH for partial update)
  const saveClasses = (e) => {
    e.preventDefault(); // Prevent form refresh

    // Prepare the updated classes object
    const updatedData = {
      classes: selectedClasses,
    };

    // Use PATCH for partial updates (only classes field)
    fetch(`${API_URL}/${selectedStudent.id}`, {
      method: 'PATCH', // Use PATCH to update only the selected classes
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updatedStudent) => {
        // Update the local state with the updated student data
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === updatedStudent.id ? updatedStudent : student
          )
        );
        closeClassEditModal(); // Close the modal after saving
      });
  };

  // Handle changes in the input fields of the student edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Get field name and its new value
    setFormData((prev) => ({ ...prev, [name]: value })); // Update form data dynamically
  };

  // Handle class selection or deselection
  const handleClassSelection = (classId) => {
    setSelectedClasses((prevClasses) =>
      prevClasses.includes(classId)
        ? prevClasses.filter((id) => id !== classId) // Remove class if already selected
        : [...prevClasses, classId] // Add class if not already selected
    );
  };

  /** -----------------
   * RENDER FUNCTIONS
   ------------------*/

  // Render a row of student data in the table
  const renderStudentRow = (student) => (
    <tr key={student.id}>
      <td>{student.id}</td>
      <td>{student.name}</td>
      <td>{student.age}</td>
      <td>{student.email}</td>
      <td>{getClassNames(student.classes)}</td>
      <td>
        <button onClick={() => openEditModal(student)}>Edit</button> {/* Open Edit Modal */}
        <button onClick={() => deleteStudent(student.id)}>Delete</button> {/* Delete student */}
        <button onClick={() => openClassEditModal(student)}>Edit Classes</button> {/* Edit Classes Modal */}
      </td>
    </tr>
  );

  // Render the Edit Modal when it is open
  const renderEditModal = () =>
    isModalOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Student</h2>
          <form onSubmit={saveStudent}>
            {/* Name Field */}
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </label>
            <br />
            {/* Age Field */}
            <label>
              Age:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </label>
            <br />
            {/* Email Field */}
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            {/* Buttons to save or cancel */}
            <button type="submit">Save</button>
            <button type="button" onClick={closeEditModal}>Cancel</button>
          </form>
        </div>
      </div>
    );

  // Render the Class Edit Modal
  const renderClassEditModal = () =>
    isClassModalOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Classes</h2>
          <form onSubmit={saveClasses}>
            {classes.map((cls) => (
              <label key={cls.id}>
                <input
                  type="checkbox"
                  checked={selectedClasses.includes(cls.id)} // Check if the class is selected
                  onChange={() => handleClassSelection(cls.id)} // Toggle selection
                />
                {cls.name}
              </label>
            ))}
            <br />
            {/* Buttons to save or cancel */}
            <button type="submit">Save</button>
            <button type="button" onClick={closeClassEditModal}>Cancel</button>
          </form>
        </div>
      </div>
    );

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Classes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{students.map(renderStudentRow)}</tbody>
      </table>

      {/* Render the modals if open */}
      {renderEditModal()}
      {renderClassEditModal()}
    </div>
  );
};

export default StudentList;
