import { Request, Response } from "express";
import { NotFoundError } from "../errors/not-found-error";
import { NotAuthorizedError } from "../errors/no-authorize-error";
import { Task, TaskStatus } from "../models/task";
import mongoose from "mongoose";

const getTasks = async(req: Request, res: Response) => {
    const tasks = await Task.find({
        ownerId: req.currentUser!.id
    });

    res.send(tasks);
}

const newTask = async(req: Request, res: Response) => {
    const { title, description, due_date } = req.body;
    
    const task = Task.build({
        title,
        description, 
        status: TaskStatus.Pending,
        dueDate: due_date,
        ownerId: new mongoose.Types.ObjectId(req.currentUser!.id),
    });

    await task.save();

    res.status(200).send({
        message: "Success",
        task
    });
}

const updateTask = async(req: Request, res: Response) => {
    const { title, description, due_date, status } = req.body;
    const taskId = req.params.taskId;

    const task = await Task.findById(taskId);
    if(!task) {
        throw new NotFoundError();
    }

    if(task.ownerId.toString() !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = due_date || task.dueDate;
    task.status = status || task.status;

    await task.save();

    res.status(201).send({
        message: "Task updated successfully.",
        task
    });
}

const deleteTask = async(req: Request, res: Response) => {
    const { taskId } = req.params;
    
    const task = await Task.findById(taskId);

    if(!task) {
        throw new NotFoundError();
    }

    if(task.ownerId.toString() !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }

    await task.deleteOne();

    res.status(204).send({ message: 'Task deleted successfully.' });
}

export { getTasks, updateTask, newTask, deleteTask};