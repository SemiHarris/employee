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

process.on('uncaughtException', function (err) {
  console.log(err);
})

app.use((req, res) => {
    res.status(404).end();
});

const getEmployee = () =>
  fetch('http://localhost:3001/api/employee', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
});

const addData = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'add',
      message: 'What database would you like to add to?(employee, role, or department)'
  }
]).then(result => {console.log(result.add)})
}

const question = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'choice',
      message: 'Would you like to ADD, UPDATE, or DELETE a database?'
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


const renderEmployee = () => getEmployee().then(displayEmployee);


  db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    renderEmployee();
  });

  