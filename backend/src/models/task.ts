import mongoose from "mongoose";

export enum TaskStatus{
    Pending = 'pending',
    InProgress = 'in-progress',
    Completed = 'completed'
}

interface TaskAttr{
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    ownerId: mongoose.Types.ObjectId;
}

interface TaskDoc extends mongoose.Document{
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: Date;
    ownerId: mongoose.Types.ObjectId;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
    build(attrs: TaskAttr): TaskDoc;
}

const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String, 
        required: true,
        enum: TaskStatus,
        default: TaskStatus.Pending
    },
    dueDate: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

TaskSchema.statics.build = (attrs: TaskAttr) => {
    return new Task(attrs);
}

const Task = mongoose.model<TaskDoc, TaskModel>('Task', TaskSchema);

export { Task };