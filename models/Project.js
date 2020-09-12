const project = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', {
        name: {type: DataTypes.STRING, unique: true},
        description: {type: DataTypes.STRING},
        teamName: {type: DataTypes.STRING}
    });
    return Project;
};
module.exports = project;