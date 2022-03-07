'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('.dotenv').config();
app.set('views', './views/routes');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

