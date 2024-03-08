import mongoose, { SchemaType } from 'mongoose';

const reminderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required:true
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      dueDate: {
        type:Date,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },

})

export default mongoose.model("Reminder", reminderSchema);