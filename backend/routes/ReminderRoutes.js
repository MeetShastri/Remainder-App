import express from 'express';
import { addReminder, deleteReminder, getReminder, pushNotification, upcomingReminder, updateReminder } from '../controller/ReminderController.js';
import { ensureAuthenticated } from '../middleware/Auth.js';
const reminderRoute = express.Router();

reminderRoute.post('/addreminder',ensureAuthenticated , addReminder);
reminderRoute.get('/getreminder/:id',ensureAuthenticated, getReminder);
reminderRoute.put('/updatereminder/:reminderId',ensureAuthenticated, updateReminder);
reminderRoute.delete('/deletereminder/:reminderId', ensureAuthenticated ,deleteReminder);
reminderRoute.get('/upcomingreminder/:id', ensureAuthenticated ,upcomingReminder);
reminderRoute.get('/sendnotification/:id', ensureAuthenticated ,pushNotification);


export default reminderRoute;