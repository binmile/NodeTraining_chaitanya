const { getAllEmployees,getUserByIDController,deleteUserController,createUserController,updateUserController} = require("../controller/employee.controller");

app.get("/user/:id", getUserByIDController)
app.get('/users2',getAllEmployees)
app.delete('/user/:id',deleteUserController)
app.post('/user',createUserController)
app.patch('/user/:id',updateUserController)