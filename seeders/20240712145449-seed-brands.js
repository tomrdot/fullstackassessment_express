'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the records already exist
    const existingBrands = await queryInterface.sequelize.query(
      'SELECT name FROM brands;', { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Filter out existing brand names
    const brandNames = [
      { name: 'Brand Space', logoPath: 'https://static.wixstatic.com/media/3fef74_25b0e123b7f44acd92320facafe7eb34~mv2.png/v1/fill/w_336,h_100,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/allocate_space_logo_white.png' },
      { name: 'Brand Work', logoPath: 'https://static.wixstatic.com/media/141ba1_ae404af69f654e579dd27e9522f1682d~mv2.webp/v1/fill/w_454,h_150,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/channelnewsasiaheader1.webp' },
      { name: 'Brand Burzt', logoPath: 'https://static.wixstatic.com/media/09d6bb_3c5beade1b9f42258cfd87469c8d8909~mv2.png/v1/crop/x_0,y_9,w_600,h_196/fill/w_256,h_80,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/burtz-logo-600px.png' }
    ].filter(newBrand => !existingBrands.some(existingBrand => existingBrand.name === newBrand.name));

    // Insert only if not already present
    if (brandNames.length > 0) {
      return queryInterface.bulkInsert('brands', brandNames.map(brand => ({
        ...brand,
        createdAt: new Date(),
        updatedAt: new Date()
      })), {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('brands', null, {});
  }
};
