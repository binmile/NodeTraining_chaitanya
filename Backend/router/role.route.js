const roleController = require("../controller/role.controller");

app.post("/role",roleController.validateRoleController)
app.get("/userList", roleController.findUserController)
app.get("/userListright", roleController.findUserControllerRight)
app.get("/userListleft", roleController.findUserControllerLeft)