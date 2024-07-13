const express = require('express');
const router = express.Router();
const checkUpc12Exists = require('../middlewares/checkUpc12Exists');
const productService = require('../services/productService');

// CREATE A NEW PRODUCT
// checkUpc12Exists IS MIDDLEWARE TO CHECK IF ALREADY EXIST
router.post('/', checkUpc12Exists, async (req, res, next) => {
  try {
      const product = await productService.createProduct(req, res);
      res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// GET ALL PRODUCTS BY PAGINATION
router.get('/', async (req, res, next) => {
  try {
    const { search, page, limit } = req.query;
    const products = await productService.getProducts(search, page, limit);
    res.json(products);
  } catch (error) {
    next(err);
  }
});

// GET SINGLE PRODUCT BY ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await productService.getProduct(req, res);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// UPDATE SINGLE PRODUCT BY ID AND BODY
router.put('/:id', async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req, res);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// SOFT DELETE SINGLE PRODUCT BY ID
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await productService.softDeleteProduct(req, res);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;