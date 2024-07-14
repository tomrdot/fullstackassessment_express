const { Product, Sequelize } = require('../models');
const { Op } = Sequelize;

const checkUpc12Exists = async (req, res, next) => {
  const { upc12 } = req.body;
  const { id } = req.params;

  try {
    const whereCondition = {
      upc12
    };

    console.log(id)
    if (id) {
      whereCondition.id = { [Op.ne]: id };
    }

    const brand = await Product.findOne({ where: whereCondition });

    if (brand) {
      return res.status(400).json({ error: `Product with UPC12 '${upc12}' already exists.` });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = checkUpc12Exists;
