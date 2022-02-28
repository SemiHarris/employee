const express = require("express");
const db = require('./db/connection');
const fetch = require('node-fetch');
const apiRoutes = require('./routes/apiRoutes');
const inquirer = require("inquirer");
const { response } = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', apiRoutes);

const employeeQuestions = [{
  type: 'input'

}]

app.use((req, res) => {
    res.status(404).end();
});

const getData = (query) =>
  fetch(('http://localhost:3001/api/' + query), {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
});

const postData = (query, data) =>
  fetch(('http://localhost:3001/api/' + query), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(data),
});

const addData = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'add',
      message: 'What database would you like to add to?(employee, role, or department)'
  }
]).then(result => {
  if (result.add = 'employee') {
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the employees first name?'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the employees last name?'
      },
      {
        type: 'number',
        name: 'role_id',
        message: 'What is the role ID of the employee?'
      },
      {
        type: 'number',
        name: 'manager_id',
        message: 'What is the mangers ID?(If none leave blank)'
      }
    ]).then(result => {
      console.log(result)
      postData('employee', result)
    })
  }
})
}

const question = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'choice',
      message: 'Would you like to ADD, UPDATE, DELETE, or VIEW a database?'
    }
  ]).then(x => {
    if(x.choice = 'Add' || x.choice === 'ADD' || x.choice === 'add'){
      addData()
    }
  })

  
}

const displayEmployee = async (worker) => {
  let jsonWorkers = await worker.json().then(x => {return x});

  console.table(jsonWorkers.data)
  question()
}


const renderEmployee = () => getData('employee').then(displayEmployee);



  db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    renderEmployee();
  });

  