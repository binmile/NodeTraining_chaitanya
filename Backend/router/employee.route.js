const {
  getUserByIDController,
  deleteUserController,
  createUserController,
  updateUserController,
  filterGetAllEmployees,
  createToken,
  verifyToken,
} = require("../controller/employee.controller");
const { authenticateToken } = require("../middleware/authenticate");

app.get("/user", filterGetAllEmployees);
app.get("/user/:id", getUserByIDController);
app.delete("/user/:id", deleteUserController);
app.post("/user", createUserController);
app.patch("/user/:id", updateUserController);

app.post("/login", createToken);
app.post("/profile", authenticateToken, verifyToken);
