import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import route from './routes/UserRoutes.js';
import reminderRoute from './routes/ReminderRoutes.js'
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const URL = process.env.MONGOURL;
app.use(bodyParser.json());


app.use('/',route)
app.use('/reminder', reminderRoute)



mongoose.connect(URL).then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
        console.log(`Server running Successfully on ${PORT}`);
    })
}).catch((error) => console.log(error));
