const { Product, Brand, Sequelize } = require('../models');
const Op = Sequelize.Op;


async function createProduct(req, res) {

  const { name, price, upc12, brandId } = req.body;
  const product = await Product.create({ name, price, upc12, brandId });
  return { product }
}
async function getProducts(search, page = 1, limit = 10) {

  const offset = (page - 1) * limit;
  let whereClause = {};

  if (search) {
    whereClause = {
      [Op.or]: [
        { name: { [Op.like]: `%${search}%` } },
        { '$Brand.name$': { [Op.like]: `%${search}%` } }
      ]
    };
  }

  const { count, rows } = await Product.findAndCountAll({
    where: whereClause,
    include: [Brand],
    limit: parseInt(limit, 10),
    offset: parseInt(offset, 10)
  });

  const totalPages = Math.ceil(count / limit);

  return { products: rows, totalPages, currentPage: parseInt(page) };
}

async function getProduct(req, res) {

  const product = await Product.findByPk(req.params.id, {
    include: [Brand]
  });
  if (!product) {
    const error = new Error('No such product found');
    error.status = 404;
    throw error;
  }
  return product
}

async function updateProduct(req, res) {
  const product = await Product.findByPk(req.params.id);
  
  if (!product) {
    const error = new Error('No such product found');
    error.status = 404;
    throw error;
  }

  const [updated] = await Product.update(
    req.body,
    { where: { id: req.params.id } }
  );

  if (updated === 1) {
    const updatedProduct = await Product.findByPk(req.params.id);
    return updatedProduct;
  } else {
    const error = new Error('Failed to update product');
    error.status = 400;
    throw error;
  }
}

async function softDeleteProduct(req, res) {
  const product = await Product.findByPk(req.params.id);
  
  if (!product) {
    const error = new Error('No such product found');
    error.status = 404;
    throw error;
  }

  await product.destroy();
  return { message: 'Product successfully deleted' };
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  softDeleteProduct
};
