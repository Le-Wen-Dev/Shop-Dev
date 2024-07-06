const app = require("./src/app");
const PORT = process.env.PORT
const server = app.listen(PORT, () => {
    console.log("WSV ecommerce start with port ", PORT);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});
