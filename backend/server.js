const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let employees = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', body: 'Employee description' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', body: 'Employee description' }
];

// Root route to fix the "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Employee API is running');
});

// Get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Create a new employee
app.post('/employees', (req, res) => {
  const newEmployee = { id: employees.length + 1, ...req.body };
  employees.push(newEmployee);
  res.json(newEmployee);
});

// Update an employee
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const updatedEmployee = req.body;
  employees = employees.map((employee) =>
    employee.id === parseInt(id) ? { ...employee, ...updatedEmployee } : employee
  );
  res.json({ message: 'Employee updated', updatedEmployee });
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.filter((employee) => employee.id !== parseInt(id));
  res.json({ message: 'Employee deleted' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


