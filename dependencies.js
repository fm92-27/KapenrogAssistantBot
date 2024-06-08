const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');

const token = process.env.token;
const mongoURL = process.env.mongoURL;

const connectDB = require('./db.js');
const User = require('./dist/models/users.js');
const hello = require('./dist/hello.js');

module.exports = {
    express,
    bodyParser,
    TelegramBot,
    mongoose,
    token,
    mongoURL,
    connectDB,
    User,
    hello
};