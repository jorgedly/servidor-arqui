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
    console.log(req.body);
    const date = calcTime('-6');
    const fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const query = `INSERT INTO DatoSensor (valor, fechahora, id) VALUES ('${valor}', '${fecha}', '${sensor}')`;
    const sql = conn.query(query, (err, results) => {
        res.json("BIEN!");
    });
});

router.get("/", (req, res) => {
    const query = `SELECT valor, fechahora, nombre FROM TipoSensor, DatoSensor WHERE TipoSensor.id=DatoSensor.id ORDER BY fechahora ASC;`;
    const sql = conn.query(query, (err, results) => {
        res.json(results);
    });
});

router.get("/seleccion/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    const query = `SELECT valor value, DATE_FORMAT(fechahora, '%d-%m-%Y %H:%i:%S') name FROM DatoSensor WHERE id='${id}'`;
    const sql = conn.query(query, (err, results) => {
        res.json(results);
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT DISTINCT DATE_FORMAT(DATE(fechahora), '%Y-%m-%d') fecha FROM DatoSensor WHERE id='${id}';`;
    const sql = conn.query(query, (err, results) => {
        res.json(results);
    });
});

router.get("/:id/:fecha", (req, res) => {
    const { id, fecha } = req.params;
    const query = `SELECT DISTINCT HOUR(fechahora) hora from DatoSensor WHERE id='${id}' and DATE(fechahora)='${fecha}' ORDER BY hora ASC`;
    const sql = conn.query(query, (err, results) => {
        res.json(results);
    });
});

router.get("/:id/:fecha/:hora", (req, res) => {
    const { id, fecha, hora } = req.params;
    const query = `SELECT MINUTE(fechahora) minuto, valor from DatoSensor WHERE id='${id}' and DATE(fechahora)='${fecha}' and HOUR(fechahora)='${hora}' order by minuto asc;`;
    const sql = conn.query(query, (err, results) => {
        res.json(results);
    });
});

function calcTime(offset) {
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const convert = new Date(utc + (3600000 * offset));
    return convert;
}

module.exports = router;