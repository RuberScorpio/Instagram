module.exports = (sequelize, DataTypes) => {
    const postsLikes = sequelize.define('postsLikes',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        like: {
            type: DataTypes.BOOLEAN,
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

return postsLikes;
}
