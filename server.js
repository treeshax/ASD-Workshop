const express = require("express");
const productsRouter = require("./routes/products.routes");

const app = express();
const port = 3000;

app.use(express.json());

// Mount routes following Route -> Middleware -> Controller -> Service -> Database flow
app.use("/products", productsRouter);

// Fallback route
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}

module.exports = app;