const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    res.status(200).json({
        "msg": "hola"
    });
});

router.get("/", async (req, res) => {
    res.status(200).json({
        "msg": "hola"
    });
});

module.exports = router;