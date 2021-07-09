const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    // instance methid per user
    checkPassword(pass) {
        return bcrypt.compareSync(pass, this.password);
    }
}

User.init(
    {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
      },
      username: {
          type: DataTypes.STRING,
          allowNull:false,
          unique: true
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [4]
          }
      }
    },
    {
      hooks: {
          async beforeCreate(user) {
            user.password = await bcrypt.hash(user.password, 10);
              return user;
              
          },
         
          async beforeUpdate(user) {
            user.password = await bcrypt.hash(user.password, 10);
              return user;
          }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  );
  
  module.exports = User;