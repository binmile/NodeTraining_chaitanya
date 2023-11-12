require("./app");
require("./database/database");
require("./models/models");
require("./models/roleModel");
// require("./models/models");
require("./router/employee.route");
require("./router/role.route")

const PORT = 8000

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
