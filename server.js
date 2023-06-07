const express = require('express');
const app = express();
const fs = require('fs');

// Read the user data from JSON file
let users = JSON.parse(fs.readFileSync('users.js'));

// API to list all users
app.get('/listUsers', (req, res) => {
  res.json(users);
});



// Function to save the users data to the users.json file
function saveUsers() {
  fs.writeFile('users.json', JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
    }
  });
}

// API to add a new user
app.post('/addUser', (req, res) => {
  const newUser = req.body;
  users[`user${Object.keys(users).length + 1}`] = newUser;
  saveUsers();
  res.send('User added successfully!');
});

// API to get all users
app.get('/users', (req, res) => {
  fs.readFile('users.js', 'utf8', (err, data) => {
    if (!err) {
      const users = JSON.parse(data);
      res.json(users);
    } else {
      console.error(err);
      res.status(500).send('Error retrieving users');
    }
  });
});

// API to get a user by ID
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const user = users[`user${userId}`];
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found!');
  }
});

// API to delete a user by ID
app.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  const user = users[`user${userId}`];
  if (user) {
    delete users[`user${userId}`];
    saveUsers();
    res.send('User deleted successfully!');
  } else {
    res.status(404).send('User not found!');
  }
});

// Helper function to save users to the JSON file
function saveUsers() {
  fs.writeFileSync('users.js', JSON.stringify(users, null, 2));
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
