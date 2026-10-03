const productsService = require("../services/products.service");
const { invalidateCache } = require("../middleware/cache.middleware");

async function getAllProducts(req, res) {
    try {
        const products = await productsService.getAllProducts();
        return res.json(products);
    } catch (err) {
        console.error("Error in getAllProducts controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const product = await productsService.getProductById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json(product);
    } catch (err) {
        console.error("Error in getProductById controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function createProduct(req, res) {
    try {
        const { name, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ message: "Name and price are required" });
        }

        const newProduct = await productsService.createProduct({ name, price });

        // Invalidate cache after successful modification
        invalidateCache();

        return res.status(201).json(newProduct);
    } catch (err) {
        console.error("Error in createProduct controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ message: "Name and price are required" });
        }

        const updatedProduct = await productsService.updateProduct(id, { name, price });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Invalidate cache after successful modification
        invalidateCache();

        return res.json(updatedProduct);
    } catch (err) {
        console.error("Error in updateProduct controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function patchProduct(req, res) {
    try {
        const { id } = req.params;
        const partialData = req.body;

        const patchedProduct = await productsService.patchProduct(id, partialData);

        if (!patchedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Invalidate cache after successful modification
        invalidateCache();

        return res.json(patchedProduct);
    } catch (err) {
        console.error("Error in patchProduct controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const deleted = await productsService.deleteProduct(id);

        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Invalidate cache after successful modification
        invalidateCache();

        return res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error("Error in deleteProduct controller:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
