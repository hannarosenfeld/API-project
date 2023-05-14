'use strict';
// test
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SpotImage.belongsTo(
        models.Spot,
          { foreignKey: 'spotId' }
      );
    }
  }
  SpotImage.init({
    spotId: DataTypes.INTEGER,
    url:{
      type: DataTypes.STRING,
       validate: {
        isValidImageFormat(url) {
          if (!url.endsWith(".png") || !url.endsWith(".jpeg") || !url.endsWith(".jpg") ) {
            throw new Error("Image URL must end in .png, .jpg, or .jpeg")
          }
        }
      }
    },
    preview: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
