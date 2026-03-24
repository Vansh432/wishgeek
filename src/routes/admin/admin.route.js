import { Router } from "express";
import { deleteTask, getAllTask, getAllUsers, getTaskFilter } from "../../controllers/admin/admin.controller.js";


const route=Router();
route.get('/users',getAllUsers)
route.get('/tasks',getAllTask)
route.delete('/tasks/:id',deleteTask)
route.get('/filter/tasks/',getTaskFilter)



export default route;