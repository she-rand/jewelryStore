
const { getDatabaseError } = require('../lib/errors/database.errors.js');
const todoModel=require('../models/todo.models.js');

const prepareHATEOAS=(items)=>{
    const results=items.map((i)=>{
        return{
            name:i.nombre,
            href:`/jojas/joya/${i.id}`,
        }
    })
    const total=items.length;
    let stockoTotal=0;
    items.forEach( item => {
        stockoTotal += item.stock;
      })
    const HATEOAS={
        total,
        stockoTotal,
        results
    }
    return HATEOAS;
}
const reportQuery = (req,res, next)=>{
    const parameters=req.params;
    const url=req.url;
    let message= `Today ${new Date()} a request has been received to the route ${url} `;
    if(parameters.length>0) message+= `to the parameters ${parameters}`
    console.log(message);
        next()
}
const readFiltered = async (req, res) => {
    const queryString = req.query;
    try {
    const  result = await todoModel.filter(queryString);
    return res.json(result);
    } catch (error) {
    console.log(error);
    if (error.code) {
        const { code, message } = getDatabaseError(error.code);
        return res.status(code).json({ message });
    } 
    return res.status(500).json({ message: "Internal server error" });
    }
    };

const read = async (req, res) => {
    const queryString = req.query;
    try {
    const  all = await todoModel.findAll(queryString);
    const result=prepareHATEOAS(all)
    return res.json(result);
    } catch (error) {
    
     if (error.code) {
        const { code, message } = getDatabaseError(error.code);
        return res.status(code).json({ message });
        } 
    return res.status(500).json({ message: "Internal server error" });
    }
    };

module.exports = { read, reportQuery,readFiltered }