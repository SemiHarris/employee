const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/employee', (req, res) => {
    const sql = `SELECT t.id, t.first_name, t.last_name,
    position.title AS role_name,
    m.first_name AS manager_name
    FROM employee t
    LEFT JOIN employee m ON m.id = t.manager_id
    LEFT JOIN position ON t.role_id = position.id
    ORDER BY last_name`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows,
      });
    });
});

router.get('/employee/:id', (req, res) => {
    const sql = `SELECT * FROM employee WHERE id = ?`;
    const params = [req.params.id];
    
    db.query(sql, params, (err, row) => {
        console.log(row)
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
}); 

router.post('/employee', ({ body }, res) => {
const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
  });
});
});

router.put('/employee/first_name/:id', (req, res) => {
  const sql = `UPDATE employee SET first_name = ? WHERE id = ?`;
  const params = [req.body.first_name, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
  });

router.put('/employee/last_name/:id', (req, res) => {
    const sql = `UPDATE employee SET last_name = ? WHERE id = ?`;
    const params = [req.body.last_name, req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Employee not found'
        });
      } else {
        res.json({
          message: 'success',
          data: req.body,
          changes: result.affectedRows
        });
      }
    });
});

router.put('/employee/role_id/:id', (req, res) => {
  const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

router.put('/employee/manager_id/:id', (req, res) => {
  const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
  const params = [req.body.manager_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found'
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows
      });
    }
  });
});

router.delete('/employee/:id', (req, res) => {
  const sql = `DELETE FROM employee WHERE id = ?`;

  db.query(sql, req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Voter not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});

module.exports = router;

