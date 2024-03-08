import Reminder from '../model/ReminderModel.js';
import User from '../model/UserModel.js';

export const addReminder = async (req, res) => {
    try {
        const { title, description, dueDate, createdBy } = req.body;
        if (!title || !description || !createdBy || !dueDate) {
            return res.status(400).json({ msg: "All fields are required" });
        }
        const reminder = await Reminder.create({ title, description, createdBy, dueDate });
        await reminder.save();
        return res.json(reminder);
    } catch (error) {
        return res.json({ msg: "error" });
    }
}

export const getReminder = async (req, res) => {
    try {
        const createdBy = req.params.id;
        const user = await User.findById(createdBy)
        if (!user) {
            return res.json({ message: "User Not Found!" });
        }
        const data = await Reminder.find({ createdBy }).populate('createdBy');
        if (data.length === 0) {
            return res.status(400).json({ msg: "No data found" });
        }
        res.json(data);
    } catch (error) {
        return res.json({ msg: "Error" })
    }
}


export const updateReminder = async (req, res) => {
    try {
        const { reminderId } = req.params;
        const updateData = req.body;
        const updatedReminder = await Reminder.findByIdAndUpdate(
            reminderId,
            updateData,
            { new: true }
        );

        if (updatedReminder) {
            res.json(updatedReminder);
        }
        else {
            res.status(404).json({ msg: "Reminder not found" });
        }
    } catch (error) {
        res.json({ msg: "Error updating reminder" });
    }
}


export const deleteReminder = async (req, res) => {
    try {
        const { reminderId } = req.params;
        const deletedReminder = await Reminder.findByIdAndDelete(reminderId);
        if (deletedReminder) {
            return res.json(deletedReminder);
        }
        else {
            return res.status(404).json({ msg: "Reminder not found" });
        }
    } catch (error) {
        return res.json({ msg: "Enter valid ID" });
    }
}


export const upcomingReminder = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        if (!user) {
            return res.json({ message: "User Not Found!" });
        }
        const upComingReminder = await Reminder.find({
            createdBy: userId,
            dueDate: { $gte: new Date() },
        }).populate('createdBy');
        if (upComingReminder.length <= 0) {
            return res.json({ msg: "You have no upcoming reminders" });
        }
        res.json(upComingReminder);
    } catch (error) {
        res.json({ msg: "Error fetching in upcoming reminders" });
    }
}


export const pushNotification = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId)
        if (!user) {
            return res.json({ message: "User Not Found!" });
        }
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        //Here i am making the formattedDate format same as Date().
        
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        const remindingMessage = await Reminder.find({ createdBy: userId, dueDate: formattedDate })
        remindingMessage.forEach(async (reminder) => {
            console.log(`Sending reminder notification for user ${userId}: ${reminder.description}`);
        })
        res.send("Notification sent successfully to console")
    } catch (error) {
        return res.json({ msg: "Error in sending notification" });
    }
}