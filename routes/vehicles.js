const express = require('express');
const router = express.Router();
const checkUpc12Exists = require('../middlewares/checkUpc12Exists');
const checkUpc12Numbers = require('../middlewares/checkUpc12Numbers');
const productService = require('../services/productService');
const vehicleService = require('../services/vehicleService');

// CREATE A NEW PRODUCT
// checkUpc12Exists IS MIDDLEWARE TO CHECK IF ALREADY EXIST
// checkUpc12Numbers IS MIDDLEWARE TO CHECK IF ONLY NUMBERS INPUT
router.post('/', [checkUpc12Numbers, checkUpc12Exists], async (req, res, next) => {
  try {
      const product = await productService.createProduct(req, res);
      res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

// GET ALL VEHICLES BY PAGINATION
router.get('/', async (req, res, next) => {
  try {
    const { search, page, limit, sortBy, sortOrder } = req.query;
    const vehicles = await vehicleService.getVehicles(search, page, limit, sortBy, sortOrder);
    res.json(vehicles);
  } catch (error) {
    next(error);
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
router.put('/:id', [checkUpc12Numbers,checkUpc12Exists], async (req, res, next) => {
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