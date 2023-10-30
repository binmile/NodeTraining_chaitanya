const {
  getAllEmployees,
  getUserByIDController,
  deleteUserController,
  createUserController,
  updateUserController,
  filterGetAllEmployees,
  searchUserController,
} = require("../controller/employee.controller");

app.get("/user/:id", getUserByIDController);
app.get("/users2", getAllEmployees);
app.delete("/user/:id", deleteUserController);
app.post("/user", createUserController);
app.patch("/user/:id", updateUserController);
app.get("/filter", filterGetAllEmployees);
app.get("/search",searchUserController)
