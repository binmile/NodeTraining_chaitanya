const {
  getUserByIDController,
  deleteUserController,
  createUserController,
  updateUserController,
  filterGetAllEmployees,
  createToken,
  verifyToken,
  sendMailController,
} = require("../controller/employee.controller");
const { authenticateToken } = require("../middleware/authenticate");

app.get("/user", filterGetAllEmployees);
app.get("/user/:id", getUserByIDController);
app.delete("/user/:id", deleteUserController);
app.patch("/user/:id", updateUserController);

app.post("/user", createUserController);

app.post("/login", createToken);
app.post("/profile", authenticateToken, verifyToken);

app.get('/mail', sendMailController)

