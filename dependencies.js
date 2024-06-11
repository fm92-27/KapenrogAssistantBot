//require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
//import mongoose from 'mongoose';

const token = process.env.token;
const mongoURL = process.env.mongoURL;

module.exports = {
    express,
    bodyParser,
    TelegramBot,
    mongoose,
    token,
    mongoURL
};