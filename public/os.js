var os = require('os');
console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());
var cpus = os.cpus();
cpus.forEach((cpu, index) => {
  console.log("CPU " + (index + 1) + " Model: " + cpu.model);
});