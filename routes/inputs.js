const express = require("express");

const inputsController = require("../controllers/inputsController");

const inputs = inputsController.getInput;

module.exports = inputs;
