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

const putData = (query, data) =>
  fetch(('http://localhost:3001/api/' + query), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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
  console.log(result.add)
  if (result.add === 'employee') {
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
  } else if (result.add === 'role') {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of the position?'
      },
      {
        type: 'number',
        name: 'salary',
        message: 'What is the salary of this position?'
      },
      {
        type: 'number',
        name: 'department_id',
        message: 'What is the deapatment ID?'
      }
    ]).then(result => {
      postData('role', result)
    })
  } else if (result.add === 'department') {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
      }
    ]).then(result => {
      postData('department', result)
      renderEmployee();
    })
  } else {
    console.log('Please enter a valid database!')
    addData()
  }
})
}

const updateData = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'selection',
      message: 'Whould you like to upadate a employee, role or department?'
    }
  ]).then(result => {
    if (result.selection === 'employee'){
      inquirer.prompt([
        {
          type: 'number',
          name: 'id',
          message: 'What is the ID of the employee you want to update?'
        },
        {
          type: 'list',
          name: 'selection',
          message: 'What do you like to update?',
          choices: ['first_name','last_name','role_id','manager_id']
        },
        {
          type: 'input',
          name: 'change',
          message: 'What would you like to change it to?'
        }
      ]).then(result => {
        if (result.selection === 'first_name'){
          data = {first_name: result.change}
          
          putData('employee/' + result.selection + '/' + result.id, data)
          renderEmployee();
        } else if (result.selection === 'last_name'){
          data = {last_name: result.change}

          putData('employee/' + result.selection + '/' + result.id, data)
          renderEmployee();
        }else if (result.selection === 'role_id'){
          data = {role_id: parseInt(result.change)}

          putData('employee/' + result.selection + '/' + result.id, data)
          renderEmployee();
        }else {
          data = {manager_id : parseInt(result.change)}

          putData('employee/' + result.selection + '/' + result.id, data)
          renderEmployee();
        }})
    } else if (result.selection === 'role'){
      inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'What is the ID of the role you want to update?'
        },
        {
          type: 'list',
          name: 'selection',
          message: 'What would you like to update?',
          choices: ['title', 'salary', 'department_id']
        },
        {
          type: 'input',
          name: 'change',
          message: 'What would you like to change it to?'
        }
      ]).then(result => {
        if (result.selection === 'title') {
          data = {title: result.change}

          putData('role/' + result.selection + '/' + result.id, data)

          renderRole()
          question()
        }else if (result.selection === 'salary') {
          data = {salary: parseInt(result.change)}

          putData('role/' + result.selection + '/' + result.id, data)
          
          renderRole()
          question()
        }else {
          data = {department_id: parseInt(result.change)}

          putData('role/' + result.selection + '/' + result.id, data)
          
          renderRole()
          question()
        }
      })
    } else if (result.selection === 'department') {
      inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Whats the ID of the department you want to change?'
        },
        {
          type: 'input',
          name: 'name',
          message: 'What would you like to change the name to?'
        }
      ]).then(result => {
        data = {name: result.name}
      
        putData('department/name/' + result.id, data)
        
        renderDepartment()
        question()
      })
    }else {
      console.log('Please enter a valid data base!')

      updateData()
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
    if(x.choice === 'Add' || x.choice === 'ADD' || x.choice === 'add'){
      addData()
    }else if (x.choice === 'Update' || x.choice === 'UPDATE' || x.choice === 'update') {
      updateData()
    }
  })

  
}

const displayEmployee = async (worker) => {
  let jsonWorkers = await worker.json().then(x => {return x});

  console.table(jsonWorkers.data)
  question()
}

const displayRole = async (role) => {
  let jsonRole = await role.json().then(x => {return x});

  console.table(jsonRole.data)
}

const displayDepartment = async (department) => {
  let jsonDepartment = await department.json().then(x => {return x});

  console.table(jsonDepartment.data)
}



const renderEmployee = () => getData('employee').then(displayEmployee);
const renderRole = () => getData('role').then(displayRole);
const renderDepartment = () => getData('department').then(displayDepartment);


  db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    renderEmployee();
  });

  