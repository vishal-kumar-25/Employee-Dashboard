import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    name: "",
    email: "",
    body: ""
  });

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts/1/comments")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error("Error fetching employee data:", error));
  }, []);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedEmployee({
      name: employees[index].name,
      email: employees[index].email,
      body: employees[index].body
    });
  };

  const handleSave = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees[index] = editedEmployee;
    setEmployees(updatedEmployees);
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <h1>Employee Dashboard</h1>
      <div className="card-container">
        {employees.map((employee, index) => (
          <div className="card" key={employee.id}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editedEmployee.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  value={editedEmployee.email}
                  onChange={handleChange}
                />
                <textarea
                  name="body"
                  value={editedEmployee.body}
                  onChange={handleChange}
                />
                <button onClick={() => handleSave(index)}>Save</button>
              </>
            ) : (
              <>
                <h2>{employee.name}</h2>
                <p>Email: {employee.email}</p>
                <p>Body: {employee.body}</p>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
