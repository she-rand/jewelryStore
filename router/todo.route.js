const  todoController  =require('../controller/todo.controller.js');
const { Router }=require('express');

const router=Router();

router.get("/",todoController.reportQuery,todoController.read);
router.get("/filtros",todoController.reportQuery,todoController.readFiltered);

module.exports =  router ;