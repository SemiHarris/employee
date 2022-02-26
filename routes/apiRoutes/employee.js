const express = require('express');
const router = express.Router();
const db = require('../../db/connect');

router.get('/employee', (req, res) => {
    const sql = `SELECT * FROM employee ORDER BY last_name`;
  
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