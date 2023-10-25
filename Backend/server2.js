require('./app')
require('./database/database')
require('./models/models')
require('./router/employee.route')


app.listen(8081,()=>{
  console.log("listening at http://localhost:8081")
})