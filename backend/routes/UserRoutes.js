import express from 'express';
import {  userLogin, userRegister}  from '../controller/UserController.js';
const route = express.Router();

route.post('/register', userRegister);
route.post('/login', userLogin);

export default route;