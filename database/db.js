const fs = require("fs");
const path = require("path");

const pathToFile = path.join(__dirname, "..", "db.json");

async function readFile() {
    try {
        const data = await fs.promises.readFile(pathToFile, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading database file:", err);
        throw err;
    }
}

async function readFileWithDelay() {
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
    return await readFile();
}

async function writeFile(data) {
    try {
        await fs.promises.writeFile(pathToFile, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
        console.error("Error writing to database file:", err);
        throw err;
    }
}

module.exports = {
    readData: readFileWithDelay,
    writeData: writeFile
};
