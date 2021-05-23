const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
      // TODO: Add password hash hooks via bcrypt
    },
    // post_id: {
    //   type: DataTypes.INTEGER,
    //   allow_null: true,
    //   references: {
    //     model: 'blog_post',
    //     key: 'id',
    //   }
    // }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (newUserData) => {
        newUserData.password = bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
