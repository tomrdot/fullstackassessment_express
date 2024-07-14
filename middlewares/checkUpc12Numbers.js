const { Product } = require('../models');

const checkUpc12Numbers = async (req, res, next) => {
    const { upc12 } = req.body;
    const upc12Regex = /^[0-9]{12}$/;

    if (!upc12Regex.test(upc12)) {
        return res.status(400).json({ error: 'UPC12 must be a 12-digit number.' });
    }
    
    try {
        next();
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = checkUpc12Numbers;
