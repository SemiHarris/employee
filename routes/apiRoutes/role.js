const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

router.get('/role', (req, res) => {
    const sql = `SELECT * FROM position`;
  
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

router.post('/role', ({ body }, res) => {
    const sql = `INSERT INTO position (id, title, salary, department_id) VALUES (?,?,?,?)`;
    console.log(body.department_id)
    const params = [body.id, body.title, body.salary, body.department_id];
    
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

router.put('/role/title/:id', (req, res) => {
    const sql = `UPDATE position SET title = ? WHERE id = ?`;
    const params = [req.body.title, req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Role not found'
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

router.put('/role/salary/:id', (req, res) => {
    const sql = `UPDATE position SET salary = ? WHERE id = ?`;
    const params = [req.body.salary, req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Role not found'
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

router.put('/role/department/:id', (req, res) => {
    const sql = `UPDATE position SET department_id = ? WHERE id = ?`;
    const params = [req.body.department_id, req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Role not found'
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

router.delete('/role/:id', (req, res) => {
    const sql = `DELETE FROM position WHERE id = ?`;
  
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