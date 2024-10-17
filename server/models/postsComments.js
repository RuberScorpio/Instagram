module.exports = (sequelize, DataTypes) => {
    const postsComments = sequelize.define('postsComments',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.STRING,
            allownull: false,
            unique: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allownull: false,
            unique: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allownull: false,
            unique: false
        }
    }
)

return postsComments;
}
