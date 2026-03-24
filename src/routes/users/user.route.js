import { Router } from "express";
import { createTaskSchema, updateTaskSchema, validate } from "../../middlewares/validator.middleware.js";
import { createTask, deleteTask, getAllTask, getTaskById, getTaskFilter, updateTask } from "../../controllers/users/user.controller.js";


const route=Router();

route.post('/tasks',validate(createTaskSchema),createTask)
route.get('/tasks',getAllTask)
route.get('/tasks/:id',getTaskById)
route.put('/tasks/:id',validate(updateTaskSchema),updateTask)
route.delete('/tasks/:id',deleteTask)
route.get('/filter/tasks',getTaskFilter)
export default route;