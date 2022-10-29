module.exports = function (sequelize, DataTypes) {
  const application = sequelize.define(
    "application",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      encId: {
        type: DataTypes.VIRTUAL,
        get() {
          return global.helpers.globalMethods.encrypt(this.id.toString());
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "application",
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  application.associate = (models) => {
    
  };
  return application;
};
