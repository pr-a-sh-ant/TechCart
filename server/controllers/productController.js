// productController.js

const productModel = require("../models/productModel");

exports.getAllProducts = (req, res) => {
  productModel
    .getAllProducts()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.getAllCategory = (req, res) => {
  productModel
    .getAllCategories()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.getAllCategoriesWithProduct = (req, res) => {
  productModel
    .getAllCategoriesWithProducts()
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.getProductsByCategory = (req, res) => {
  const category = req.params.category;
  productModel
    .getProductsByCategory(category)
    .then((products) => {
      res.json(products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.getProductDetailsById = (req, res) => {
  const productId = req.params.id;
  productModel
    .getProductDetailsById(productId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error fetching product.");
    });
};

exports.allOrderByProductId = (req, res) => {
  const productId = req.params.id;
  productModel
    .allOrderByProductId(productId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error fetching product.");
    });
};

exports.createProduct = (req, res) => {
  const { name, price, description, image, categoryID } = req.body;
  productModel
    .createProduct(name, price, description, categoryID, image)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error creating product.");
    });
};

exports.createCategory = (req, res) => {
  const { name, image } = req.body;
  productModel
    .createCategory(name, image)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error creating category.");
    });
};

exports.updateProduct = (req, res) => {
  const { id, name, price, description } = req.body;
  productModel
    .updateProduct(id, name, price, description)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error updating product.");
    });
};

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;
  productModel
    .deleteProduct(productId)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send("Error deleting product.");
    });
};
