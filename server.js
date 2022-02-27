const express = require("express");
const db = require('./db/connection');
const fetch = require('node-fetch');
const apiRoutes = require('./routes/apiRoutes');
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

const displayEmployee = async (worker) => {
  let jsonWorkers = await worker.json().then(x => {return x});

  console.table(jsonWorkers.data)

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

  