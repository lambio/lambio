const asset = (sequelize, DataTypes) => {
    const Asset = sequelize.define('asset', {
        name: {type: DataTypes.STRING},
        type: {type: DataTypes.STRING},
        info: {type: DataTypes.JSON}
    });

    return Asset;
    
};
module.exports = asset;