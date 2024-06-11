const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.TOKEN;

module.exports = {
    express,
    bodyParser,
    TelegramBot,
    TOKEN
};