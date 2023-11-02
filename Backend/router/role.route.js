const roleController = require("../controller/role.controller");

app.post("/role",roleController.validateRoleController)
app.get("/userList", roleController.findUserController)