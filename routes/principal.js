const express = require("express");
const router = express.Router();
const mysql = require('mysql');

const conn = mysql.createPool({
    host: 'us-cdbr-iron-east-04.cleardb.net',
    user: 'bd4b1aaf518d86',
    password: '6b1e5ab4',
    database: 'heroku_af73cab8a038b48'
});

router.post("/", (req, res) => {
    const { sensor, valor, fecha, hora } = req.body;
    const date = fecha.split('.').join('-');
    const time = hora.split('.').join(':');
    const query = `INSERT INTO DatoSensor (valor, fecha, hora, id) VALUES ('${valor}', '${date}', '${time}', '${sensor}')`;
    const sql = conn.query(query, (err, results) => {
        res.json();
    });
});

router.get("/", (req, res) => {
    const query = `SELECT valor, fecha, hora, nombre FROM TipoSensor, DatoSensor WHERE TipoSensor.id=DatoSensor.id;`;
    const sql = conn.query(query, (err, results) => {
        res.json(results);
    });
});

module.exports = router;