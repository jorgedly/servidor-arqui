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
    const { sensor, valor } = req.body;
    const date = new Date();
    const fechahora = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const query = `INSERT INTO DatoSensor (valor, fechahora, id) VALUES ('${valor}', '${fechahora}', '${sensor}')`;
    console.log(`sensor: ${sensor}, valor:${valor}, fechahora: ${fechahora}`);
    const sql = conn.query(query, (err, results) => {
        res.json();
    });
});

router.get("/", (req, res) => {
    const query = `SELECT valor, fechahora, nombre FROM TipoSensor, DatoSensor WHERE TipoSensor.id=DatoSensor.id;`;
    const sql = conn.query(query, (err, results) => {
        res.json(results);
    });
});

module.exports = router;