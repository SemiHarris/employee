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

const deleteData = (query) =>
  fetch(('http://localhost:3001/api/' + query), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
});

/*This adds data by ID*/
const addData = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'add',
      message: 'What database would you like to add to?(employee, role, or department)'
  }
]).then(result => {
  console.log(result.add)
   /*This adds data to employee database*/
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
      data = {
        first_name: result.first_name, 
        last_name: result.last_name, 
        role_id: parseInt(result.role_id),
        manager_id: parseInt(result.manager_id)
      }
      console.log(data)
      postData('employee', data);
      renderEmployee();
    })
  } else if (result.add === 'role') {
    /*This add data to the role database*/
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
    /*This adds data to the department database*/
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

/*This updates data by ID*/
const updateData = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'selection',
      message: 'Whould you like to upadate a employee, role or department?'
    }
  ]).then(result => {
    /*This updates the employee based on ID*/
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
        /*This updates the database in the employee database*/
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
      /*This updates the role data based on ID*/
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
        /*This updates the data in the role database by ID*/
        if (result.selection === 'title') {
          data = {title: result.change}

          putData('role/' + result.selection + '/' + result.id, data)

          renderRole();
        }else if (result.selection === 'salary') {
          data = {salary: parseInt(result.change)}

          putData('role/' + result.selection + '/' + result.id, data)
          
          renderRole()
        }else {
          data = {department_id: parseInt(result.change)}

          putData('role/' + result.selection + '/' + result.id, data)
          
          renderRole()
        }
      })
    } else if (result.selection === 'department') {
      /*This updates the department database by ID*/
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
        /*This updates the department name*/
        data = {name: result.name}
      
        putData('department/name/' + result.id, data)
        
        renderDepartment()
      })
    }else {
      console.log('Please enter a valid data base!')

      updateData()
    }
  })
}

/*This deletes data by ID*/
const removeData = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'selection',
      message: 'Which database do you want to delete data from?',
      choices: ['employee','role','department']
    }
  ]).then(result => {
    /*This deletes data from the employee database by ID*/
    if (result.selection === 'employee') {
      inquirer.prompt([
        {
          type: 'number',
          name: 'employeeID',
          message: 'What is the ID of the employee you want to delete?'
        }
      ]).then(result => {
        deleteData('employee/' + result.employeeID)
        renderEmployee()
      })
    }else if (result.selection === 'role'){
      /*This deletes data from the role database by ID*/
      inquirer.prompt([
        {
          type: 'number',
          name: 'role_id',
          message: 'What is the ID of the role you want to delete?'
        }
      ]).then(result => {
        deleteData('role/' + result.role_id);
        renderRole()
      })
    }else {
      /*This deletes data from the department database by ID*/
      inquirer.prompt([
        {
          type: 'number',
          name: 'department_id',
          message: 'What is the ID of the department you want to delete?'
        }
      ]).then(result => {
        deleteData('department/' + result.department_id);
        renderDepartment()
      })
    }
  })
}

/*This sends a GET request for each database and the displays it as a table*/
const viewData = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'select',
      message: 'What database do you want to view?',
      choices: ['employee','role','department']
    }
  ]).then(result => {
    if (result.select === 'employee') {
      renderEmployee()
    }else if (result.select === 'role') {
      renderRole()
    }else {
      renderDepartment()
    }
  })
}

/*This asks what they want to do to a database*/
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
    }else if (x.choice === 'Delete' || x.choice === 'DELETE' || x.choice === 'delete') {
      removeData()
    }else if (x.choice === 'View' || x.choice === 'VIEW' || x.choice === 'view') {
      viewData()
    }else {
      console.log('Please enter a valid choice.')

      question()
    }
  })

  
}

/*This diplays the employee database as a table*/
const displayEmployee = async (worker) => {
  let jsonWorkers = await worker.json().then(x => {return x});

  console.table(jsonWorkers.data)
  question()
}

/*This displays the role database as a table*/
const displayRole = async (role) => {
  let jsonRole = await role.json().then(x => {return x});

  console.table(jsonRole.data)
  question()
}

/*This displays the department database as a table*/
const displayDepartment = async (department) => {
  let jsonDepartment = await department.json().then(x => {return x});

  console.table(jsonDepartment.data)
  question()
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

  