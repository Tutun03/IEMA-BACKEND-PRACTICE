const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4500;

// Connect to MongoDB (Assuming you have an 'employees' collection in the 'employee' database)
mongoose.connect('mongodb://localhost:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true });

// Create an employee schema and model (using Mongoose)
const employeeSchema = new mongoose.Schema({
  signin: String,
  password: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve HTML files from the 'public' directory

// Route for handling employee registration
app.post('/authenticate', async (req, res) => {
  // Process authentication form submission
  const { signin, password } = req.body;

  // Validate credentials (add proper validation)
  if (signin && password) {
    // Check against MongoDB (Assuming you have an 'employees' collection in the 'employee' database)
    const newEmployee = new Employee({ signin, password });

    try {
      // Save the new employee to the 'employees' collection
      await newEmployee.save();
      res.send('Employee registered successfully!');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(400).send('Signin and password are required');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});