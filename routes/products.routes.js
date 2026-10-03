const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.controller");
const { cacheMiddleware } = require("../middleware/cache.middleware");

// GET endpoints with caching middleware
router.get("/", cacheMiddleware, productsController.getAllProducts);
router.get("/:id", cacheMiddleware, productsController.getProductById);

// Mutation endpoints
router.post("/", productsController.createProduct);
router.put("/:id", productsController.updateProduct);
router.patch("/:id", productsController.patchProduct);
router.delete("/:id", productsController.deleteProduct);

module.exports = router;
