const express  = require('express');
const todoRoute = require('./router/todo.route.js');

const app =express();
app.use(express.json());

app.use("/joyas",todoRoute);

app.listen(3000,()=>{
    console.log("Server on")
})