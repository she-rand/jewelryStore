const format = require('pg-format');
const { pool } = require('../database/connection.js');

const findAll = async ({ limit = 5, order_by = "id_ASC", page = 1 }) => {
    const [field, direction] = order_by.split("_");
    const query = "SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s";
    const offset = (page - 1) * limit;
    const formattedQuery = format(query, field, direction, limit, offset);
    console.log(formattedQuery);
    const { rows } = await pool.query(formattedQuery);
    return rows;
    };

const filter = async({precio_max,precio_min,categoria,metal}) => {
    let filters=[];
    const values= [];
    
    const addFilter=(field,comparator,value)=>{
        values.push(value);
        const {length} =filters;
        filters.push(`${field} ${comparator} $${length+1}`);
    }
    if (precio_max) addFilter("precio","<=",precio_max);
    if (precio_min) addFilter("precio",">=",precio_min);
    if (categoria) addFilter("categoria",">=",categoria);
    if (metal) addFilter("metal",">=",metal);

    if (filters.length>0){
        filters= filters.join(" AND ");

    }

    let query="SELECT * FROM inventario ";
    query += " WHERE " + filters;
    
    const { rows } = await pool.query(query,values);
    return rows;
}

module.exports = { findAll,filter }