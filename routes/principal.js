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

router.get("/borrar", (req, res) => {
    const query = `DELETE FROM DatoSensor;`;
    const sql = conn.query(query, (err, results) => {
        res.json();
    });
});

router.get("/seleccion/:sensor", (req, res) => {
    const { sensor } = req.params;
    const query = `SELECT valor value, DATE_FORMAT(fechahora, '%d-%m-%Y %H:%i:%S') name FROM DatoSensor, TipoSensor WHERE DatoSensor.id=TipoSensor.id AND TipoSensor.nombre='${sensor}'`;
    const sql = conn.query(query, (err, results) => {
        res.json(results);
    });
});

router.get("/seleccion/:sensor/:fini/:hini/:ffin/:hfin", (req, res) => {
    const { sensor, fini, hini, ffin, hfin } = req.params;
    console.log(req.params);
    const query = `SELECT valor value, DATE_FORMAT(fechahora, '%d-%m-%Y %H:%i:%S') name FROM DatoSensor, TipoSensor WHERE DatoSensor.id=TipoSensor.id AND TipoSensor.nombre='${sensor}' AND DATE(DATE_FORMAT(fechahora, '%d-%m-%Y'))=DATE(DATE_FORMAT('${fini}', '%d-%m-%Y')) AND TIME(DATE_FORMAT(fechahora, '%H:%i:%S'))=TIME(DATE_FORMAT('${hini}', '%H:%i:%S')) AND DATE(DATE_FORMAT(fechahora, '%d-%m-%Y'))=DATE(DATE_FORMAT('${ffin}', '%d-%m-%Y')) AND TIME(DATE_FORMAT(fechahora, '%H:%i:%S'))=TIME(DATE_FORMAT('${hfin}', '%H:%i:%S'));`;
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