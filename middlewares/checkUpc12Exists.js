const { Product } = require('../models');

const checkUpc12Exists = async (req, res, next) => {
  const { upc12 } = req.body;

  try {
    const brand = await Product.findOne({ where: { upc12 } });
    if (brand) {
      return res.status(400).json({ error: `Product with UPC12 '${upc12}' already exists.` });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = checkUpc12Exists;
