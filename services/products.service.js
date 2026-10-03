const db = require("../database/db");

async function getAllProducts() {
    return await db.readData();
}

async function getProductById(id) {
    const products = await db.readData();
    const product = products.find((item) => item.id == id);
    return product || null;
}

async function createProduct(productData) {
    const products = await db.readData();
    
    // Generate new unique numeric id
    const nextId = products.length > 0 
        ? Math.max(...products.map((p) => Number(p.id) || 0)) + 1 
        : 1;

    const newProduct = {
        id: nextId,
        name: productData.name,
        price: productData.price
    };

    products.push(newProduct);
    await db.writeData(products);

    return newProduct;
}

async function updateProduct(id, productData) {
    const products = await db.readData();
    const index = products.findIndex((item) => item.id == id);

    if (index === -1) {
        return null;
    }

    const updatedProduct = {
        id: Number(id),
        name: productData.name,
        price: productData.price
    };

    products[index] = updatedProduct;
    await db.writeData(products);

    return updatedProduct;
}

async function patchProduct(id, partialData) {
    const products = await db.readData();
    const index = products.findIndex((item) => item.id == id);

    if (index === -1) {
        return null;
    }

    const existingProduct = products[index];
    const patchedProduct = {
        ...existingProduct,
        ...partialData,
        id: existingProduct.id // ensure ID is not overwritten
    };

    products[index] = patchedProduct;
    await db.writeData(products);

    return patchedProduct;
}

async function deleteProduct(id) {
    const products = await db.readData();
    const index = products.findIndex((item) => item.id == id);

    if (index === -1) {
        return false;
    }

    products.splice(index, 1);
    await db.writeData(products);

    return true;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
