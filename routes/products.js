const express = require('express');
const router = express.Router();
const { Product, Brand } = require('../models');


// Create a new product
router.post('/', async (req, res) => {
  try {
      const { name, price, upc12, brandId } = req.body;
      
      // Check if upc12 is already used
      const existingProduct = await Product.findOne({ where: { upc12 } });
      if (existingProduct) {
        return res.status(400).json({ error: `UPC12 '${upc12}' already exists.` })
      }

      const newProduct = await Product.create({ name, price, upc12, brandId });
      res.status(201).json(newProduct);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

// Read all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Brand]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a specific product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Brand]
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, price, upc12, brandId } = req.body;
    const [updated] = await Product.update({ name, price, upc12, brandId }, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const updatedProduct = await Product.findByPk(req.params.id);
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;