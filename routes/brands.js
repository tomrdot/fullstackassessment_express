const express = require('express');
const router = express.Router();
const { Product, Brand } = require('../models');


// Create a new brand
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

// Read all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;