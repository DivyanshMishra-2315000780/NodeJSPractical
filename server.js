const http = require("http");
const fs = require("fs");
const os = require("os");

const PORT = 3000;

const server = http.createServer((req, res) => {

    if (req.url === "/updateUser" && req.method === "GET") {
        const data = `Visited at ${new Date().toISOString()}\n`;

        fs.appendFile("visitors.log", data, (err) => {
            if (err) return res.end("Error writing file");

            res.end("User added");
        });
    }

    else if (req.url === "/saveLog" && req.method === "GET") {
        fs.readFile("visitors.log", "utf8", (err, data) => {
            if (err) return res.end("No data found");

            res.end(data);
        });
    }

    else if (req.url === "/backup" && req.method === "POST") {
        fs.copyFile("visitors.log", "backup.log", (err) => {
            if (err) return res.end("Error in backup");

            res.end("Backup created");
        });
    }

    else if (req.url === "/clearLog" && req.method === "GET") {
        fs.writeFile("visitors.log", "", (err) => {
            if (err) return res.end("Error clearing file");

            res.end("Log cleared");
        });
    }

    else if (req.url === "/serverInfo" && req.method === "GET") {
        const info = {
            platform: os.platform(),
            cpu: os.cpus().length,
            freeMemory: os.freemem()
        };

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(info));
    }

    else {
        res.end("Route not found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});