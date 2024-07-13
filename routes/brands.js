const express = require('express');
const router = express.Router();
const { Product, Brand, Sequelize } = require('../models');
const { fn, col, literal } = Sequelize;


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
    next(err);
  }
});

// Read all brands
router.get('/', async (req, res, next) => {
  try {
    const brands = await Brand.findAll({
      attributes: {
        include: [
          [
            fn('COUNT', col('Products.id')),
            'productCount'
          ]
        ]
      },
      include: [{
        model: Product,
        attributes: [],
        required: false,
        where: {
          deletedAt: null
        }
      }],
      group: ['Brand.id']
    });
    res.json(brands);
  } catch (err) {
    next(err);
  }
});

module.exports = router;