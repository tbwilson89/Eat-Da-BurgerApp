var connection = require('./connection.js')


var orm = {

  selectAll: function(table, cb){
    let queryString = `SELECT * FROM ${table};`
    connection.query(queryString, function(err, result){
      if(err){throw err}
      cb(result)
    })
  },

  insertOne: function(table, cols, vals, cb){
    let queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${vals.length > 0 ? Array(vals.length).fill('?').toString() : ''})`
    console.log(queryString)
    connection.query(queryString, vals, function(err, result){
      if(err){throw err}
      cb(result)
    })
  },

  updateOne: function(table, objColVals, condition, cb){
    let colVals = []
    console.log(objColVals)
    for(key in objColVals){
      colVals.push(`${key}=${typeof objColVals[key] === 'string' && objColVals[key].indexOf(' ') >= 0 ? "'"+objColVals[key]+"'" : objColVals[key]}`)
    }
    let queryString = `UPDATE ${table} SET ${colVals.toString()} WHERE ${condition}`
    connection.query(queryString, function(err, result){
      if(err){throw err}
      cb(result)
    })
  }
}

module.exports = orm
