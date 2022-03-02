"use strict";
// import express ,{ Request, Response, NextFunction } from "express";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 3000;
app.get('/', (req, res) => {
    if (Math.random() > 0.5) {
        res.status(200).send("Connected succesful");
    }
    else {
        res.status(400).send("Connection failed..");
    }
});
app.listen(port, () => {
    console.log(`Timezones by location application is running on port ${port}.`);
});
//# sourceMappingURL=app.js.map