
const { log } = require('console');
const mongoose = require('mongoose');
const os = require('os')
const process = require('process')
const _SECONDS = 5000
// check connect
const countConnect = () => {
    const numConnections = mongoose.connections.length;
    console.log("Number of connections:", numConnections);
};

// check over load check su qua tai cua connects
const checkOverload = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // example maximun number of conncettions based on number of cores
        const maxConnections = numCores * 5;
        console.log("Active connections:", numConnections);
        console.log("Memory usage:", memoryUsage / 1024 / 1024, "MB");
        if (numConnections > maxConnections) {
            console.log("Connections overload deteced!");
        }
    }, _SECONDS) //monitor every 5 seconds
}
module.exports = { countConnect, checkOverload };
